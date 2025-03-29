import os
from langchain_groq import ChatGroq
from langchain.schema import SystemMessage, HumanMessage

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

llm = ChatGroq(groq_api_key=groq_api_key, model_name = "gemma2-9b-it", temperature=0)

BASE_URL = "http://127.0.0.1:5000"
CHECK_BALANCE_URL = f"{BASE_URL}/check_balance"
TRANSFER_MONEY_URL = f"{BASE_URL}/transfer_money"
SET_GOALS_URL = f"{BASE_URL}/api/goals"

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
    
    amount = int(input("Enter amount to transfer: "))

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

def set_goals(user_id):
    expenditure_goal = int(input("Enter your monthly expenditure goal: "))
    savings_goal = int(input("Enter your monthly savings goal: "))

    data = {"userId":user_id,  "expenditureGoal": expenditure_goal, "savingsGoal":savings_goal}

    try:
        response = requests.post(SET_GOALS_URL, json=data)
        if response.status_code == 200:
            return "Goals set successfully!"
        else:
            return f"Error: {response.status_code} - {response.text}"
    except requests.exceptions.RequestException as e:
        return f"Failed to conenct to API: {str(e)}"

# def handle_general_query(user_query):
#     prompt = PromptTemplate.from_template("Answer this banking query: {query}")
#     chain = prompt | llm
#     response = chain.invoke({"query": user_query})
#     return response.content.strip()


user_id = "user123"
check_balance_tool = Tool(
    name="Check Balance",
    func = lambda _: check_balance(user_id),
    description="Retrieve the user's bank balance instantly. Always return the balance directly."
)


transfer_money_tool = Tool(
    name = "Transfer Money",
    func = lambda _: transfer_money(user_id),
    description="Transfers money from your account. You will be prompted to enter details. If the transaction is cancelled, do not pursue it further"
)

set_goals_tool = Tool(
    name="Set Goals",
    func=lambda _: set_goals(user_id),
    description="Sets your monthly expenditure and savings goals. You will be prompted to enter the goals."
)

agent_executor = initialize_agent(
    tools = [check_balance_tool, transfer_money_tool, set_goals_tool],
    llm = llm,
    # agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,

    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    memory = memory,
    verbose=True
)

# if __name__ == "__main__":
#     ai_agent("user123")

# query1 = f"Do I have enough money?"
# query1 = f"How to open a new bank account?"
# query1 = f"Check my balance"
# query2 = "I want to pay to a friend."
query3 = "I want to set my monthly goals."


# response1 = agent_executor.run(query1)
response3 = agent_executor.run(query3)

# print(response1) 
print(response3)  