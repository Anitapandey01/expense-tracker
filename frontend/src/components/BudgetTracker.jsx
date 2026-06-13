import { useState } from "react";

function BudgetTracker({ expenses }) {
const [budget, setBudget] = useState(10000);

const totalSpent = expenses.reduce(
(sum, expense) =>
sum + Number(expense.amount),
0
);

const percentage =
budget > 0
? (totalSpent / budget) * 100
: 0;

const exceeded =
totalSpent > budget;

return ( <div className="budget-card"> <h2>💰 Monthly Budget</h2>


  <input
    type="number"
    value={budget}
    onChange={(e) =>
      setBudget(
        Number(e.target.value)
      )
    }
    placeholder="Enter Budget"
  />

  <h3>Budget: ₹{budget}</h3>

  <h3>Spent: ₹{totalSpent}</h3>

  <div className="progress-bar">
    <div
      className={
        exceeded
          ? "progress danger"
          : "progress"
      }
      style={{
        width: `${Math.min(
          percentage,
          100
        )}%`,
      }}
    />
  </div>

  {exceeded && (
    <p className="warning">
      ⚠ Budget Exceeded!
    </p>
  )}
</div>


);
}

export default BudgetTracker;
