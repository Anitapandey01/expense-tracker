import { useEffect, useState } from "react";
import API from "./services/api";

import Sidebar from "./components/Sidebar";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SummaryCards from "./components/SummaryCards";
import ExpenseChart from "./components/ExpenseChart";
import Filters from "./components/Filters";
import ExportCSV from "./components/ExportCSV";
import BudgetTracker from "./components/BudgetTracker";
import MonthlyReport from "./components/MonthlyReport";
import YearlyReport from "./components/YearlyReport";

function App() {
const [expenses, setExpenses] = useState([]);
const [editingExpense, setEditingExpense] =
useState(null);

const [activeTab, setActiveTab] =
useState("dashboard");

const [selectedCategory, setSelectedCategory] =
useState("All");

const [startDate, setStartDate] =
useState("");

const [endDate, setEndDate] =
useState("");

const fetchExpenses = async () => {
try {
const response =
await API.get("/expenses");


  setExpenses(response.data);
} catch (error) {
  console.error(error);
}


};

useEffect(() => {
fetchExpenses();
}, []);

const filteredExpenses =
expenses.filter((expense) => {
const categoryMatch =
selectedCategory === "All" ||
expense.category ===
selectedCategory;


  const expenseDate =
    new Date(expense.date);

  const startMatch =
    !startDate ||
    expenseDate >=
      new Date(startDate);

  const endMatch =
    !endDate ||
    expenseDate <=
      new Date(endDate);

  return (
    categoryMatch &&
    startMatch &&
    endMatch
  );
});


return ( <div className="layout"> <Sidebar
     activeTab={activeTab}
     setActiveTab={setActiveTab}
   />


  <div className="main-content">
    <h1>
      Personal Expense Analytics
    </h1>

    {/* DASHBOARD */}
    {activeTab ===
      "dashboard" && (
      <>
        <SummaryCards
          expenses={
            filteredExpenses
          }
        />

        <BudgetTracker
          expenses={
            filteredExpenses
          }
        />

        <ExpenseChart
          expenses={
            filteredExpenses
          }
        />
      </>
    )}

    {/* EXPENSES */}
    {activeTab ===
      "expenses" && (
      <>
        <Filters
          selectedCategory={
            selectedCategory
          }
          setSelectedCategory={
            setSelectedCategory
          }
          startDate={startDate}
          setStartDate={
            setStartDate
          }
          endDate={endDate}
          setEndDate={
            setEndDate
          }
        />

        <ExpenseForm
          fetchExpenses={
            fetchExpenses
          }
          editingExpense={
            editingExpense
          }
          setEditingExpense={
            setEditingExpense
          }
        />

        <div className="export-wrapper">
          <ExportCSV
            expenses={
              filteredExpenses
            }
          />
        </div>

        <ExpenseTable
          expenses={
            filteredExpenses
          }
          fetchExpenses={
            fetchExpenses
          }
          setEditingExpense={
            setEditingExpense
          }
        />
      </>
    )}

    {/* ANALYTICS */}
    {activeTab ===
      "analytics" && (
      <>
        <SummaryCards
          expenses={
            filteredExpenses
          }
        />

        <ExpenseChart
          expenses={
            filteredExpenses
          }
        />
      </>
    )}

    {/* REPORTS */}
    {activeTab ===
      "reports" && (
      <>
        <SummaryCards
          expenses={
            filteredExpenses
          }
        />

        <MonthlyReport
          expenses={
            filteredExpenses
          }
        />

        <YearlyReport
          expenses={
            filteredExpenses
          }
        />

        <div className="export-wrapper">
          <ExportCSV
            expenses={
              filteredExpenses
            }
          />
        </div>
      </>
    )}
  </div>
</div>


);
}

export default App;
