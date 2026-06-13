import API from "../services/api";

function ExpenseTable({
  expenses,
  fetchExpenses,
  setEditingExpense,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Failed to delete expense");
    }
  };

  if (expenses.length === 0) {
    return (
      <div>
        <h2 className="table-title">
  📋 All Expenses
</h2>
        <h3>No expenses found.</h3>
      </div>
    );
  }

  return (
    <div>
     <h2 className="table-title">
  📋 All Expenses
</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>₹{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>{expense.note}</td>

              <td>
                <button
                  onClick={() =>
                    setEditingExpense(expense)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(expense.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;