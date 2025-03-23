import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Calendar, DollarSign, TrendingDown, TrendingUp, ChevronDown, LogOut, Settings, Menu, X } from 'lucide-react';
import VoiceAssistant from "./Voice_assistance";

const Bank_details = () => {
  // State for time period filter
  const [timePeriod, setTimePeriod] = useState('month');
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mock data - would be replaced with actual API data in production
  const [accountData, setAccountData] = useState({
    balance: 8452.97,
    income: 3240.50,
    expenses: 1876.23,
  });
  
  const [transactions, setTransactions] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  // Colors for the pie chart
  const COLORS = ['#4F46E5', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF'];

  // Fetch data based on selected time period (mock implementation)
  useEffect(() => {
    // This would be replaced with actual API fetch logic
    fetchDataFromAPI(timePeriod);
  }, [timePeriod]);

  // Mock function to fetch data from API
  const fetchDataFromAPI = (period) => {
    // In a real implementation, this would be an API call to your backend
    // Example using fetch:
    // 
    // fetch(`/api/transactions?period=${period}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setExpenseData(data.expenseData);
    //     setIncomeData(data.incomeData);
    //     setTransactions(data.transactions);
    //     setAccountData(data.accountData);
    //   })
    //   .catch(error => console.error('Error fetching transaction data:', error));
    
    // For now, we'll use mock data based on the period
    
    // Mock expense categories data for pie chart
    const mockExpenseData = [
      { name: 'Housing', value: period === 'week' ? 450 : period === 'month' ? 1200 : 14400 },
      { name: 'Food', value: period === 'week' ? 180 : period === 'month' ? 650 : 7800 },
      { name: 'Transportation', value: period === 'week' ? 100 : period === 'month' ? 350 : 4200 },
      { name: 'Entertainment', value: period === 'week' ? 90 : period === 'month' ? 320 : 3840 },
      { name: 'Others', value: period === 'week' ? 120 : period === 'month' ? 480 : 5760 }
    ];
    
    // Mock income sources data for pie chart
    const mockIncomeData = [
      { name: 'Salary', value: period === 'week' ? 900 : period === 'month' ? 3500 : 42000 },
      { name: 'Dividends', value: period === 'week' ? 70 : period === 'month' ? 280 : 3360 },
      { name: 'Freelance', value: period === 'week' ? 150 : period === 'month' ? 600 : 7200 }
    ];
    
    // Mock transactions
    const mockTransactions = [
      { id: 1, date: '2025-03-08', description: 'Grocery Store', category: 'Food', amount: -78.35 },
      { id: 2, date: '2025-03-07', description: 'Salary Deposit', category: 'Income', amount: 1750.00 },
      { id: 3, date: '2025-03-06', description: 'Electric Bill', category: 'Utilities', amount: -92.47 },
      { id: 4, date: '2025-03-05', description: 'Coffee Shop', category: 'Food', amount: -4.50 },
      { id: 5, date: '2025-03-04', description: 'Rideshare', category: 'Transportation', amount: -18.65 },
      { id: 6, date: '2025-03-03', description: 'Freelance Payment', category: 'Income', amount: 250.00 },
      { id: 7, date: '2025-03-02', description: 'Phone Bill', category: 'Utilities', amount: -59.99 },
      { id: 8, date: '2025-03-01', description: 'Restaurant', category: 'Food', amount: -45.80 }
    ];
    
    // Update state with mock data
    setExpenseData(mockExpenseData);
    setIncomeData(mockIncomeData);
    setTransactions(mockTransactions);
    
    // Update account data based on period
    setAccountData({
      balance: period === 'week' ? 8452.97 : period === 'month' ? 8452.97 : 8452.97,
      income: period === 'week' ? 1120.50 : period === 'month' ? 3240.50 : 38886.00,
      expenses: period === 'week' ? 940.11 : period === 'month' ? 1876.23 : 22514.76,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Transactions &amp; Analytics</h1>
          
          {/* Time Period Selector */}
          <div className="mt-4 md:mt-0">
            <div className="relative inline-block text-left">
              <div className="flex items-center">
                <button
                  className={`px-4 py-2 rounded-l-lg ${timePeriod === 'week' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                  onClick={() => setTimePeriod('week')}
                >
                  Week
                </button>
                <button
                  className={`px-4 py-2 ${timePeriod === 'month' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border-t border-b border-gray-300'}`}
                  onClick={() => setTimePeriod('month')}
                >
                  Month
                </button>
                <button
                  className={`px-4 py-2 rounded-r-lg ${timePeriod === 'year' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                  onClick={() => setTimePeriod('year')}
                >
                  Year
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full mr-4">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">Current Balance</h3>
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-3xl font-bold text-gray-800">${accountData.balance.toFixed(2)}</p>
                <p className="ml-2 text-sm text-gray-500">Available</p>
              </div>
            </div>
          </div>
          
          {/* Income Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">Total Income</h3>
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-3xl font-bold text-green-600">+${accountData.income.toFixed(2)}</p>
                <p className="ml-2 text-sm text-gray-500">This {timePeriod}</p>
              </div>
            </div>
          </div>
          
          {/* Expenses Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-full mr-4">
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
                </div>
              </div>
              <div className="flex items-end">
                <p className="text-3xl font-bold text-red-600">-${accountData.expenses.toFixed(2)}</p>
                <p className="ml-2 text-sm text-gray-500">This {timePeriod}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts and Transaction History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expense Breakdown */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Expense Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Income Sources */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Income Sources</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-indigo-100 rounded-xl shadow-md p-6">
                <VoiceAssistant/>
                <p className='text-xl font-bold mt-4'>Hints:-
                  <ul>
                    <li className='text-base m-1 font-semibold'>What's my current balance?</li>
                    <li className='text-base m-1 font-semibold'>Deposit $1000 into my account  </li>
                    <li className='text-base m-1 font-semibold'>What is my expenditure of this month?</li>
                  </ul>
                </p>
          </div>
        </div> 
        
        {/* Monthly History Chart */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Income &amp; Expenses</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Jan', income: 3600, expenses: 2100 },
                  { name: 'Feb', income: 3950, expenses: 2300 },
                  { name: 'Mar', income: 3240, expenses: 1876 },
                  { name: 'Apr', income: 3500, expenses: 2200 },
                  { name: 'May', income: 3700, expenses: 2150 },
                  { name: 'Jun', income: 3300, expenses: 1900 }
                ]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Bar dataKey="income" fill="#4F46E5" name="Income" />
                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank_details;