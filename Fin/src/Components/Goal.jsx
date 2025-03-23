// // export default Goal;

// import React, { useState, useEffect } from 'react';
// import axios from "axios";

// const Goal = () => {
//   // For adding a new expenditure
//   const [expenditureCategory, setExpenditureCategory] = useState('medical');
//   const [newExpenditure, setNewExpenditure] = useState('');
//   const [newExpenditureDesc, setNewExpenditureDesc] = useState('');
//   const [showExpenditureForm, setShowExpenditureForm] = useState(false);

//   // For adding new savings
//   const [selectedCategory, setSelectedCategory] = useState('medical');
//   const [newSavingsAmount, setNewSavingsAmount] = useState('');
//   const [newSavingsDesc, setNewSavingsDesc] = useState('');
//   const [showSavingsForm, setShowSavingsForm] = useState(false);

//   // Category to *view* in the expenditure table
//   const [viewExpenditureCategory, setViewExpenditureCategory] = useState('medical');

//   // Category to *view* in the savings table
//   const [viewSavingsCategory, setViewSavingsCategory] = useState('medical');

//   // Data from backend
//   const [expenditureData, setExpenditureData] = useState({
//     medical: [],
//     home: [],
//     investment: [],
//     emergency: [],
//     others: []
//   });
//   const [savingsData, setSavingsData] = useState({
//     medical: [],
//     home: [],
//     investment: [],
//     emergency: [],
//     others: []
//   });

//   // Goals & Current Totals
//   const [goals, setGoals] = useState({ expenditure: 0, savings: 0 });
//   const [currentAmounts, setCurrentAmounts] = useState({ expenditure: 0, savings: 0 });

//   // Show/hide the "Set Goals" form
//   const [showGoalForm, setShowGoalForm] = useState(true);

//   // Hardcoded user ID (replace with your auth system's user id)
//   const userId = "67d35a98e34092949a38bc53";

//   // Category options
//   const categories = [
//     { value: 'medical', label: 'Medical' },
//     { value: 'home', label: 'Home' },
//     { value: 'investment', label: 'Investment' },
//     { value: 'emergency', label: 'Emergency' },
//     { value: 'others', label: 'Others' }
//   ];

//   // 1) Load existing goal data from backend on mount
//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/goals/${userId}`)
//       .then((res) => {
//         const data = res.data;
//         setGoals({ 
//           expenditure: data.expenditureGoal, 
//           savings: data.savingsGoal 
//         });
//         setCurrentAmounts({ 
//           expenditure: data.currentExpenditure, 
//           savings: data.currentSavings 
//         });
//         setExpenditureData(data.expenditureData);
//         setSavingsData(data.savingsData);
//       })
//       .catch((err) => console.error("Error loading goal data:", err));
//   }, [userId]);

//   // 2) Set or update goals
//   const handleSetGoals = (e) => {
//     e.preventDefault();
//     axios.post("http://localhost:5000/api/goals", {
//       userId,
//       expenditureGoal: goals.expenditure,
//       savingsGoal: goals.savings
//     })
//     .then((res) => {
//       const data = res.data;
//       setGoals({ 
//         expenditure: data.expenditureGoal, 
//         savings: data.savingsGoal 
//       });
//       setShowGoalForm(false);
//     })
//     .catch((err) => console.error("Error setting goals:", err));
//   };

//   // 3) Add new expenditure
//   const handleAddExpenditure = (e) => {
//     e.preventDefault();
//     if (newExpenditure) {
//       axios.post("http://localhost:5000/api/expenditure", {
//         userId,
//         category: expenditureCategory,
//         amount: parseFloat(newExpenditure),
//         description: newExpenditureDesc
//       })
//       .then((res) => {
//         const data = res.data;
//         // Update local states
//         setExpenditureData(data.expenditureData);
//         setCurrentAmounts(prev => ({
//           ...prev,
//           expenditure: data.currentExpenditure
//         }));
//         // Reset form
//         setNewExpenditure('');
//         setNewExpenditureDesc('');
//         setShowExpenditureForm(false);
//       })
//       .catch((err) => console.error("Error adding expenditure:", err));
//     }
//   };

//   // 4) Add new savings
//   const handleAddSavings = (e) => {
//     e.preventDefault();
//     if (newSavingsAmount && newSavingsDesc) {
//       axios.post("http://localhost:5000/api/savings", {
//         userId,
//         category: selectedCategory,
//         amount: parseFloat(newSavingsAmount),
//         description: newSavingsDesc,
//       })
//       .then((res) => {
//         const data = res.data;
//         setSavingsData(data.savingsData);
//         setCurrentAmounts(prev => ({
//           ...prev,
//           savings: data.currentSavings
//         }));
//         // Reset form
//         setNewSavingsAmount('');
//         setNewSavingsDesc('');
//         setShowSavingsForm(false);
//       })
//       .catch((err) => console.error("Error adding savings:", err));
//     }
//   };

//   // 5) Helper functions for UI

//   // Setting monthly goals in local state
//   const handleGoalChange = (e) => {
//     const { name, value } = e.target;
//     setGoals(prev => ({
//       ...prev,
//       [name]: parseFloat(value) || 0
//     }));
//   };

//   // Calculate bar width
//   const calculatePercentage = (current, goal) => {
//     if (goal === 0) return 0;
//     const percentage = (current / goal) * 100;
//     return Math.min(percentage, 100);
//   };

//   // Expenditure bar color
//   const getExpenditureBarColor = () => {
//     if (goals.expenditure === 0) return 'bg-gray-300';
//     const ratio = currentAmounts.expenditure / goals.expenditure;
//     if (ratio >= 1) return 'bg-red-600';
//     if (ratio >= 0.6) return 'bg-red-400';
//     return 'bg-red-200';
//   };

//   // Savings bar color
//   const getSavingsBarColor = () => {
//     if (goals.savings === 0) return 'bg-gray-300';
//     const ratio = currentAmounts.savings / goals.savings;
//     if (ratio >= 1) return 'bg-green-600';
//     if (ratio >= 0.6) return 'bg-green-400';
//     return 'bg-green-200';
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-indigo-400 bg-opacity-20 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Goal Tracker</h1>

//       {/* --------------- GOAL SETTING FORM --------------- */}
//       {showGoalForm ? (
//         <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//           <h2 className="text-2xl font-bold mb-6">Set Your Goals</h2>
//           <form onSubmit={handleSetGoals}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-lg font-medium mb-2" htmlFor="expenditure">
//                   Monthly Expenditure Goal ($):
//                 </label>
//                 <input
//                   type="number"
//                   id="expenditure"
//                   name="expenditure"
//                   value={goals.expenditure}
//                   onChange={handleGoalChange}
//                   className="w-full p-3 border border-gray-300 rounded-md"
//                   required
//                   min="0"
//                 />
//               </div>
//               <div>
//                 <label className="block text-lg font-medium mb-2" htmlFor="savings">
//                   Monthly Savings Goal ($):
//                 </label>
//                 <input
//                   type="number"
//                   id="savings"
//                   name="savings"
//                   value={goals.savings}
//                   onChange={handleGoalChange}
//                   className="w-full p-3 border border-gray-300 rounded-md"
//                   required
//                   min="0"
//                 />
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-indigo-700 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
//               >
//                 Set Goals
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         /* --------------- GOAL PROGRESS SECTION --------------- */
//         <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
//           <div className="flex justify-between mb-6">
//             <h2 className="text-2xl font-bold">Goal Progress</h2>
//             <button
//               onClick={() => setShowGoalForm(true)}
//               className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-md font-medium text-sm transition-colors duration-200"
//             >
//               Edit Goals
//             </button>
//           </div>

//           {/* Expenditure Progress */}
//           <div className="mb-6">
//             <div className="flex justify-between mb-2">
//               <h3 className="text-xl font-semibold">Expenditure</h3>
//               <span className="font-medium">
//                 ${currentAmounts.expenditure.toFixed(2)} of ${goals.expenditure.toFixed(2)}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-6">
//               <div
//                 className={`h-6 rounded-full ${getExpenditureBarColor()}`}
//                 style={{ width: `${calculatePercentage(currentAmounts.expenditure, goals.expenditure)}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between mt-2">
//               <div className="flex space-x-4 text-sm">
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-red-200 rounded-full mr-1"></div>
//                   <span>Less than 60%</span>
//                 </span>
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
//                   <span>60-99%</span>
//                 </span>
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-red-600 rounded-full mr-1"></div>
//                   <span>100%+</span>
//                 </span>
//               </div>
//               <button
//                 onClick={() => setShowExpenditureForm(true)}
//                 className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md font-medium text-sm transition-colors duration-200"
//               >
//                 Add Expenditure
//               </button>
//             </div>

//             {/* Add Expenditure Form */}
//             {showExpenditureForm && (
//               <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white">
//                 <h4 className="font-medium mb-3">Add New Expenditure</h4>
//                 <form onSubmit={handleAddExpenditure}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     {/* Expenditure Category Dropdown */}
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Category:</label>
//                       <select
//                         value={expenditureCategory}
//                         onChange={(e) => setExpenditureCategory(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                       >
//                         {categories.map((cat) => (
//                           <option key={cat.value} value={cat.value}>
//                             {cat.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-1">Amount ($):</label>
//                       <input
//                         type="number"
//                         value={newExpenditure}
//                         onChange={(e) => setNewExpenditure(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                         required
//                         min="0"
//                         step="0.01"
//                       />
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Description:</label>
//                     <input
//                       type="text"
//                       value={newExpenditureDesc}
//                       onChange={(e) => setNewExpenditureDesc(e.target.value)}
//                       className="w-full p-2 border border-gray-300 rounded-md"
//                       placeholder="Optional"
//                     />
//                   </div>
//                   <div className="flex justify-end space-x-2">
//                     <button
//                       type="button"
//                       onClick={() => setShowExpenditureForm(false)}
//                       className="px-3 py-1 border border-gray-300 rounded-md text-sm"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </div>

//           {/* Savings Progress */}
//           <div>
//             <div className="flex justify-between mb-2">
//               <h3 className="text-xl font-semibold">Savings</h3>
//               <span className="font-medium">
//                 ${currentAmounts.savings.toFixed(2)} of ${goals.savings.toFixed(2)}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-6">
//               <div
//                 className={`h-6 rounded-full ${getSavingsBarColor()}`}
//                 style={{ width: `${calculatePercentage(currentAmounts.savings, goals.savings)}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between mt-2 text-sm">
//               <div className="flex space-x-4">
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-green-200 rounded-full mr-1"></div>
//                   <span>Less than 60%</span>
//                 </span>
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-green-400 rounded-full mr-1"></div>
//                   <span>60-99%</span>
//                 </span>
//                 <span className="flex items-center">
//                   <div className="w-3 h-3 bg-green-600 rounded-full mr-1"></div>
//                   <span>100%+</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* --------------- EXPENDITURE BREAKDOWN --------------- */}
//       <div className="mb-6">
//         <label className="block text-lg font-medium mb-2">Expenditure Breakdown:</label>
//         <select
//           value={viewExpenditureCategory}
//           onChange={(e) => setViewExpenditureCategory(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {categories.map((cat) => (
//             <option key={cat.value} value={cat.value}>
//               {cat.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
//         <h2 className="text-2xl font-semibold capitalize">
//           {viewExpenditureCategory} Expenditure
//         </h2>
//         {expenditureData[viewExpenditureCategory]?.length > 0 ? (
//           <div className="mt-4">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-3 text-left border border-gray-200">Date</th>
//                   <th className="p-3 text-left border border-gray-200">Description</th>
//                   <th className="p-3 text-left border border-gray-200">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {expenditureData[viewExpenditureCategory].map((item, index) => (
//                   <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
//                     <td className="p-3 border border-gray-200">
//                       {new Date(item.date).toLocaleDateString()} 
//                       {' '}
//                       {new Date(item.date).toLocaleTimeString()}
//                     </td>
//                     <td className="p-3 border border-gray-200">{item.description || '—'}</td>
//                     <td className="p-3 border border-gray-200">
//                       ${item.amount?.toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr className="bg-gray-100 font-bold">
//                   <td className="p-3 border border-gray-200" colSpan="2">Total</td>
//                   <td className="p-3 border border-gray-200">
//                     $
//                     {expenditureData[viewExpenditureCategory]
//                       .reduce((sum, item) => sum + (item.amount || 0), 0)
//                       .toFixed(2)}
//                   </td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-500 italic mt-2">
//             No expenditures in {viewExpenditureCategory} yet.
//           </p>
//         )}
//       </div>

//       {/* --------------- SAVINGS BREAKDOWN --------------- */}
//       <div className="mb-6">
//         <label className="block text-lg font-medium mb-2">Savings Breakdown:</label>
//         <select
//           value={viewSavingsCategory}
//           onChange={(e) => setViewSavingsCategory(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {categories.map((cat) => (
//             <option key={cat.value} value={cat.value}>
//               {cat.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-semibold capitalize">
//             {viewSavingsCategory} Savings
//           </h2>
//           <button
//             onClick={() => setShowSavingsForm(true)}
//             className="bg-indigo-700 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
//           >
//             Add Savings
//           </button>
//         </div>

//         {showSavingsForm && (
//           <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white">
//             <h4 className="font-medium mb-3">Add New Savings</h4>
//             <form onSubmit={handleAddSavings}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Amount ($):</label>
//                   <input
//                     type="number"
//                     value={newSavingsAmount}
//                     onChange={(e) => setNewSavingsAmount(e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     required
//                     min="0"
//                     step="0.01"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Description:</label>
//                   <input
//                     type="text"
//                     value={newSavingsDesc}
//                     onChange={(e) => setNewSavingsDesc(e.target.value)}
//                     className="w-full p-2 border border-gray-300 rounded-md"
//                     required
//                     placeholder="What are you saving for?"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowSavingsForm(false)}
//                   className="px-3 py-1 border border-gray-300 rounded-md text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {savingsData[viewSavingsCategory]?.length > 0 ? (
//           <div className="mt-4">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-3 text-left border border-gray-200">Date</th>
//                   <th className="p-3 text-left border border-gray-200">Description</th>
//                   <th className="p-3 text-left border border-gray-200">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {savingsData[viewSavingsCategory].map((item, index) => (
//                   <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
//                     <td className="p-3 border border-gray-200">
//                       {new Date(item.date).toLocaleDateString()} 
//                       {' '}
//                       {new Date(item.date).toLocaleTimeString()}
//                     </td>
//                     <td className="p-3 border border-gray-200">{item.description}</td>
//                     <td className="p-3 border border-gray-200">${item.amount?.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr className="bg-gray-100 font-bold">
//                   <td className="p-3 border border-gray-200" colSpan="2">Total</td>
//                   <td className="p-3 border border-gray-200">
//                     $
//                     {savingsData[viewSavingsCategory]
//                       .reduce((sum, item) => sum + (item.amount || 0), 0)
//                       .toFixed(2)}
//                   </td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-500 italic">No savings in {viewSavingsCategory} yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Goal;
import React, { useState, useEffect } from 'react';
import axios from "axios";

const Goal = () => {
  // Hardcoded user ID (replace with your actual user logic)
  const userId = "67d35a98e34092949a38bc53";

  // For monthly goals
  const [goals, setGoals] = useState({ expenditure: 0, savings: 0 });
  const [currentAmounts, setCurrentAmounts] = useState({ expenditure: 0, savings: 0 });
  const [showGoalForm, setShowGoalForm] = useState(true);

  // For category-based expenditure
  const [expenditureData, setExpenditureData] = useState({
    medical: [],
    home: [],
    investment: [],
    emergency: [],
    others: []
  });
  const [selectedExpenditureCategory, setSelectedExpenditureCategory] = useState("home");
  const [showExpenditureForm, setShowExpenditureForm] = useState(false);
  const [newExpenditure, setNewExpenditure] = useState("");
  const [newExpenditureDesc, setNewExpenditureDesc] = useState("");

  // For category-based savings
  const [savingsData, setSavingsData] = useState({
    medical: [],
    home: [],
    investment: [],
    emergency: [],
    others: []
  });
  const [selectedSavingsCategory, setSelectedSavingsCategory] = useState("home");
  const [showSavingsForm, setShowSavingsForm] = useState(false);
  const [newSavingsAmount, setNewSavingsAmount] = useState("");
  const [newSavingsDesc, setNewSavingsDesc] = useState("");

  // Category options
  const categories = [
    { value: "medical", label: "Medical" },
    { value: "home", label: "Home" },
    { value: "investment", label: "Investment" },
    { value: "emergency", label: "Emergency" },
    { value: "others", label: "Others" },
  ];

  // 1) Load data on mount
  useEffect(() => {
    axios.get(`http://localhost:5000/api/goals/${userId}`)
      .then((res) => {
        const data = res.data;
        setGoals({
          expenditure: data.expenditureGoal,
          savings: data.savingsGoal,
        });
        setCurrentAmounts({
          expenditure: data.currentExpenditure,
          savings: data.currentSavings,
        });
        setExpenditureData(data.expenditureData);
        setSavingsData(data.savingsData);
        setShowGoalForm(false); // If you want to show progress by default
      })
      .catch((err) => console.error("Error loading goal data:", err));
  }, [userId]);

  // 2) Set or update monthly goals
  const handleSetGoals = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/goals", {
      userId,
      expenditureGoal: goals.expenditure,
      savingsGoal: goals.savings,
    })
    .then((res) => {
      const data = res.data;
      setGoals({
        expenditure: data.expenditureGoal,
        savings: data.savingsGoal,
      });
      setShowGoalForm(false);
    })
    .catch((err) => console.error("Error setting goals:", err));
  };

  // 3) Add new expenditure
  const handleAddExpenditure = (e) => {
    e.preventDefault();
    if (newExpenditure) {
      axios.post("http://localhost:5000/api/expenditure", {
        userId,
        category: selectedExpenditureCategory,
        amount: parseFloat(newExpenditure),
        description: newExpenditureDesc,
      })
      .then((res) => {
        const data = res.data;
        setExpenditureData(data.expenditureData);
        setCurrentAmounts(prev => ({
          ...prev,
          expenditure: data.currentExpenditure,
        }));
        // Reset form
        setNewExpenditure("");
        setNewExpenditureDesc("");
        setShowExpenditureForm(false);
      })
      .catch((err) => console.error("Error adding expenditure:", err));
    }
  };

  // 4) Add new savings
  const handleAddSavings = (e) => {
    e.preventDefault();
    if (newSavingsAmount) {
      axios.post("http://localhost:5000/api/savings", {
        userId,
        category: selectedSavingsCategory,
        amount: parseFloat(newSavingsAmount),
        description: newSavingsDesc,
      })
      .then((res) => {
        const data = res.data;
        setSavingsData(data.savingsData);
        setCurrentAmounts(prev => ({
          ...prev,
          savings: data.currentSavings,
        }));
        // Reset form
        setNewSavingsAmount("");
        setNewSavingsDesc("");
        setShowSavingsForm(false);
      })
      .catch((err) => console.error("Error adding savings:", err));
    }
  };

  // 5) Helper functions
  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoals((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculatePercentage = (current, goal) => {
    if (goal === 0) return 0;
    const percentage = (current / goal) * 100;
    return Math.min(percentage, 100);
  };

  const getExpenditureBarColor = () => {
    if (goals.expenditure === 0) return "bg-gray-300";
    const ratio = currentAmounts.expenditure / goals.expenditure;
    if (ratio >= 1) return "bg-red-600";
    if (ratio >= 0.6) return "bg-red-400";
    return "bg-red-200";
  };

  const getSavingsBarColor = () => {
    if (goals.savings === 0) return "bg-gray-300";
    const ratio = currentAmounts.savings / goals.savings;
    if (ratio >= 1) return "bg-green-600";
    if (ratio >= 0.6) return "bg-green-400";
    return "bg-green-200";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-indigo-400 bg-opacity-20 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Goal Tracker</h1>

      {/* --------------- GOAL SETTING FORM --------------- */}
      {showGoalForm ? (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Set Your Goals</h2>
          <form onSubmit={handleSetGoals}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium mb-2" htmlFor="expenditure">
                  Monthly Expenditure Goal ($):
                </label>
                <input
                  type="number"
                  id="expenditure"
                  name="expenditure"
                  value={goals.expenditure}
                  onChange={handleGoalChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-lg font-medium mb-2" htmlFor="savings">
                  Monthly Savings Goal ($):
                </label>
                <input
                  type="number"
                  id="savings"
                  name="savings"
                  value={goals.savings}
                  onChange={handleGoalChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                  min="0"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-700 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Set Goals
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* --------------- GOAL PROGRESS --------------- */
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Goal Progress</h2>
            <button
              onClick={() => setShowGoalForm(true)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-md font-medium text-sm transition-colors duration-200"
            >
              Edit Goals
            </button>
          </div>

          {/* Expenditure Progress */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-semibold">Expenditure</h3>
              <span className="font-medium">
                ${currentAmounts.expenditure.toFixed(2)} of ${goals.expenditure.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className={`h-6 rounded-full ${getExpenditureBarColor()}`}
                style={{ width: `${calculatePercentage(currentAmounts.expenditure, goals.expenditure)}%` }}
              ></div>
            </div>
          </div>

          {/* Savings Progress */}
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-semibold">Savings</h3>
              <span className="font-medium">
                ${currentAmounts.savings.toFixed(2)} of ${goals.savings.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className={`h-6 rounded-full ${getSavingsBarColor()}`}
                style={{ width: `${calculatePercentage(currentAmounts.savings, goals.savings)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* --------------- EXPENDITURE BREAKDOWN --------------- */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Expenditure Breakdown:</label>
        <select
          value={selectedExpenditureCategory}
          onChange={(e) => setSelectedExpenditureCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold capitalize">
            {selectedExpenditureCategory} Expenditure
          </h2>
          <button
            onClick={() => setShowExpenditureForm(true)}
            className="bg-indigo-700 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Add Expenditure
          </button>
        </div>

        {/* Add Expenditure Form */}
        {showExpenditureForm && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white">
            <h4 className="font-medium mb-3">Add New Expenditure</h4>
            <form onSubmit={handleAddExpenditure}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount ($):</label>
                  <input
                    type="number"
                    value={newExpenditure}
                    onChange={(e) => setNewExpenditure(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description:</label>
                  <input
                    type="text"
                    value={newExpenditureDesc}
                    onChange={(e) => setNewExpenditureDesc(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowExpenditureForm(false)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Expenditure Table for the Selected Category */}
        {expenditureData[selectedExpenditureCategory]?.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border border-gray-200">Date</th>
                <th className="p-3 text-left border border-gray-200">Description</th>
                <th className="p-3 text-left border border-gray-200">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenditureData[selectedExpenditureCategory].map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 border border-gray-200">
                    {new Date(item.date).toLocaleDateString()}{" "}
                    {new Date(item.date).toLocaleTimeString()}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {item.description || "—"}
                  </td>
                  <td className="p-3 border border-gray-200">
                    ${item.amount?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td className="p-3 border border-gray-200" colSpan="2">Total</td>
                <td className="p-3 border border-gray-200">
                  $
                  {expenditureData[selectedExpenditureCategory]
                    .reduce((sum, item) => sum + (item.amount || 0), 0)
                    .toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="text-gray-500 italic">No expenditures in {selectedExpenditureCategory} yet. Click "Add Expenditure" to get started.</p>
        )}
      </div>

      {/* --------------- SAVINGS BREAKDOWN --------------- */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Savings Breakdown:</label>
        <select
          value={selectedSavingsCategory}
          onChange={(e) => setSelectedSavingsCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold capitalize">
            {selectedSavingsCategory} Savings
          </h2>
          <button
            onClick={() => setShowSavingsForm(true)}
            className="bg-indigo-700 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
          >
            Add Savings
          </button>
        </div>

        {/* Add Savings Form */}
        {showSavingsForm && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white">
            <h4 className="font-medium mb-3">Add New Savings</h4>
            <form onSubmit={handleAddSavings}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount ($):</label>
                  <input
                    type="number"
                    value={newSavingsAmount}
                    onChange={(e) => setNewSavingsAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description:</label>
                  <input
                    type="text"
                    value={newSavingsDesc}
                    onChange={(e) => setNewSavingsDesc(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                    placeholder="What are you saving for?"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowSavingsForm(false)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Savings Table */}
        {savingsData[selectedSavingsCategory]?.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border border-gray-200">Date</th>
                <th className="p-3 text-left border border-gray-200">Description</th>
                <th className="p-3 text-left border border-gray-200">Amount</th>
              </tr>
            </thead>
            <tbody>
              {savingsData[selectedSavingsCategory].map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 border border-gray-200">
                    {new Date(item.date).toLocaleDateString()}{" "}
                    {new Date(item.date).toLocaleTimeString()}
                  </td>
                  <td className="p-3 border border-gray-200">{item.description}</td>
                  <td className="p-3 border border-gray-200">${item.amount?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td className="p-3 border border-gray-200" colSpan="2">Total</td>
                <td className="p-3 border border-gray-200">
                  $
                  {savingsData[selectedSavingsCategory]
                    .reduce((sum, item) => sum + (item.amount || 0), 0)
                    .toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p className="text-gray-500 italic">No savings in {selectedSavingsCategory} yet.</p>
        )}
      </div>
    </div>
  );
};

export default Goal;
