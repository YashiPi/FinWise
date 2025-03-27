import os
# from langchain.llms import Groq
from langchain_groq import ChatGroq
from langchain.schema import SystemMessage, HumanMessage
from langchain.prompts import PromptTemplate
# from langchain.chains import LLMChain
from langchain.schema.runnable import RunnableLambda
from langchain_core.runnables import RunnableSequence
from dotenv import load_dotenv
import requests

from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.tools import Tool
from langchain.memory import ConversationBufferMemory


load_dotenv()

groq_api_key = os.environ['GROQ_API_KEY']

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# llm = ChatGroq(model_name="mistral", groq_api_key=groq_api_key)
llm = ChatGroq(groq_api_key=groq_api_key, model_name = "gemma2-9b-it", temperature=0)
# llm = ChatGroq(groq_api_key=groq_api_key, model_name = "deepseek-r1-distill-qwen-32b")

BALANCE_INTENTS = ["what's my balance", "check my bank balance", "how much money is left"]
TRANSFER_INTENTS = ["send money", "transfer money", "pay someone", "make a transaction"]

BASE_URL = "http://127.0.0.1:5000"
CHECK_BALANCE_URL = f"{BASE_URL}/check_balance"
TRANSFER_MONEY_URL = f"{BASE_URL}/transfer_money"

prompt = PromptTemplate(
    input_variables = ["query"],
    template="""
    You are a smart banking assistant. Identify the intent from the user's query.
    Possible intents: check_balance, transfer_money, general_query.

    User Query: {query}
    Intent:
    """
)

def detect_intent(user_query):
    query_lower = user_query.lower()
    if any(phrase in query_lower for phrase in BALANCE_INTENTS):
        return "check_balance"
    elif any(phrase in query_lower for phrase in TRANSFER_INTENTS):
        return "transfer_money"
    else:
        return "general_query"

def check_balance(user_id):
    response = requests.get(CHECK_BALANCE_URL, params={"userId": user_id})
    if response.status_code == 200:
        return f"Your balance is ₹{response.json().get('balance')}"
    return "Could not retrieve balance."

def transfer_money(user_id):
    to_account = input("Enter recipient's account number (or type 'cancel' to stop): ")
    if to_account.lower() == "cancel":
        print("Transaction cancelled.")
        return "Transaction canceled."
    
    amount = int(input("Enter amount to transfer (or type 'cancel' to stop): "))
    if amount.lower() == "cancel":
        return "Transaction canceled."

    data = {"fromUserId": user_id, "toUserId": to_account, "amount": amount}
    
    try:
        response = requests.post(TRANSFER_MONEY_URL, json=data)
        # print("API Response:", response.status_code, response.text)  # Debugging

        if response.status_code == 200:
            return response.json().get("message", "Transfer successful!")
        else:
            return f"Error: {response.status_code} - {response.text}"
    except requests.exceptions.RequestException as e:
        return f"Failed to connect to API: {str(e)}"
    
    # response = requests.post(TRANSFER_MONEY_URL, json=data)

    # if response.status_code == 200:
    #     return response.json().get("message", "Transfer successful!")
    # return "Transaction failed."

def handle_general_query(user_query):
    prompt = PromptTemplate.from_template("Answer this banking query: {query}")
    chain = prompt | llm
    response = chain.invoke({"query": user_query})
    return response.content.strip()

# def ai_agent(user_id):
#     while True:
#         user_query = input("Ask me something about your banking: ").strip().lower()
        
#         intent = detect_intent(user_query)

#         if intent == "check_balance":
#             print(check_balance(user_id))
#         elif intent == "transfer_money":
#             print(transfer_money(user_id))
#         else:
#             print(handle_general_query(user_query))

user_id = "user123"
check_balance_tool = Tool(
    name="Check Balance",
    func = lambda _: check_balance(user_id),
    description="Retrieve the user's bank balance instantly. Always return the balance directly."
)

# def transfer_money_tool_wrapper(query: str):
#     words = query.split()
#     amount = next((word for word in words if word.isdigit()), None)
#     recipient = words[-1] if amount else None

#     if amount and recipient:
#         return transfer_money(amount, recipient)
#     return "Please specify the amount and recipient."

transfer_money_tool = Tool(
    name = "Transfer Money",
    func = lambda _: transfer_money(user_id),
    description="Transfers money from your account. You will be prompted to enter details. If the transaction is cancelled, do not pursue it further"
)

agent_executor = initialize_agent(
    tools = [check_balance_tool, transfer_money_tool],
    llm = llm,
    # agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,

    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    memory = memory,
    verbose=True
)

# custom_prompt = PromptTemplate.from_template("""
# You are a banking assistant. Your job is to assist users efficiently.
# # - You can only perform ONE reasoning step before choosing an action.
# - If a question cannot be answered by a tool, reply directly.

# User query: {input}
# """)

# agent_executor.agent.llm_chain.prompt = custom_prompt

# if __name__ == "__main__":
#     ai_agent("user123")

# query1 = f"Do I have enough money?"
# query1 = f"How to open a new bank account?"
query1 = f"Teach me about bacnkign policis for elderly"
query2 = "I want to pay to a friend."

response1 = agent_executor.run(query1)
response2 = agent_executor.run(query2)

print(response1)  # Expected: "Your current balance is $1,500."
print(response2)  # Expected: "Transferred ₹10 to user456 successfully."


# ctrl + alt + 4