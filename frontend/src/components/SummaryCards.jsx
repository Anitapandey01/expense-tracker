function SummaryCards({ expenses }) {
  const totalSpent = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((expense) =>
            Number(expense.amount)
          )
        )
      : 0;

  return (
    <div className="summary-container">
      <div className="card">
        <h3>Total Spent</h3>
        <p>₹{totalSpent}</p>
      </div>

      <div className="card">
        <h3>Highest Expense</h3>
        <p>₹{highestExpense}</p>
      </div>

      <div className="card">
        <h3>Total Entries</h3>
        <p>{expenses.length}</p>
      </div>
    </div>
  );
}

export default SummaryCards;