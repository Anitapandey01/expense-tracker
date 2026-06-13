import { useState } from "react";

function BudgetTracker({ expenses }) {
  const [budget, setBudget] = useState("");

  const budgetAmount = Number(budget) || 0;

  const totalSpent = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const remaining =
    budgetAmount - totalSpent;

  const percentage =
    budgetAmount > 0
      ? Math.min(
          (totalSpent / budgetAmount) *
            100,
          100
        )
      : 0;

  return (
    <div className="budget-card">
      <h2>💰 Monthly Budget</h2>

      <input
        type="number"
        placeholder="e.g. 5000"
        value={budget}
        onChange={(e) =>
          setBudget(e.target.value)
        }
        className="budget-input"
      />

      <div className="budget-details">
        <h3>
          Budget: ₹{budgetAmount}
        </h3>

        <h3>
          Spent: ₹{totalSpent}
        </h3>

        <h3>
          Remaining: ₹{remaining}
        </h3>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>

      {budgetAmount > 0 &&
        totalSpent > budgetAmount && (
          <p className="warning">
            ⚠️ Budget Exceeded by ₹
            {totalSpent - budgetAmount}
          </p>
        )}
    </div>
  );
}

export default BudgetTracker;