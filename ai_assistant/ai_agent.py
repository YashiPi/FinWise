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

load_dotenv()

groq_api_key = os.environ['GROQ_API_KEY']

# llm = ChatGroq(model_name="mistral", groq_api_key=groq_api_key)
# llm = ChatGroq(groq_api_key=groq_api_key, model_name = "gemma2-9b-it")
llm = ChatGroq(groq_api_key=groq_api_key, model_name = "deepseek-r1-distill-qwen-32b")

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
    to_account = input("Enter recipient's account number: ")
    amount = input("Enter amount to transfer: ")

    data = {"fromUserId": user_id, "toUserId": to_account, "amount": amount}
    response = requests.post(TRANSFER_MONEY_URL, json=data)

    if response.status_code == 200:
        return response.json().get("message", "Transfer successful!")
    return "Transaction failed."

def handle_general_query(user_query):
    prompt = PromptTemplate.from_template("Answer this banking query: {query}")
    chain = prompt | llm
    response = chain.invoke({"query": user_query})
    return response.content.strip()

def ai_agent(user_id):
    while True:
        user_query = input("Ask me something about your banking: ").strip().lower()
        
        intent = detect_intent(user_query)

        if intent == "check_balance":
            print(check_balance(user_id))
        elif intent == "transfer_money":
            print(transfer_money(user_id))
        else:
            print(handle_general_query(user_query))
            

# # chain = LLMChain(llm=llm, prompt=prompt)
# chain = prompt | llm | RunnableLambda(lambda x: x["content"].strip())

# def handle_user_query(user_query, user_id, conversation_state):
#     response = chain.invoke({"query": user_query}).strip()

#     if response == "check_balance":
#         res = requests.get(f"http://localhost:5000/check_balance?userId={user_id}")
#         return f"Your balance is ₹{res.json().get('balance', 'N/A')}"
    
#     elif response == "transfer_money":
#         if "recipient" not in conversation_state:
#             return "Please provide the recipient's user ID."
#         elif "amount" not in conversation_state:
#             return "Please provide the transfer amount."

#         res = requests.post("http://localhost:5000/transfer_money", json={
#             "fromUserId": user_id,
#             "toUserId": conversation_state["recipient"],
#             "amount": int(conversation_state["amount"])
#         })
#         return res.json().get("message", "Transaction failed.")
#         # return "message"

#     return "I can help with banking transactions. Ask about your balance or send money."

# conversation_state = {}
# print(handle_user_query("What's my balance?", "user123", conversation_state))

if __name__ == "__main__":
    ai_agent("user123")
