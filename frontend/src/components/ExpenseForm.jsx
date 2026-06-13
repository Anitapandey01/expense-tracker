import { useState, useEffect } from "react";
import API from "../services/api";

function ExpenseForm({
fetchExpenses,
editingExpense,
setEditingExpense,
}) {
const [amount, setAmount] = useState("");
const [category, setCategory] =
useState("");
const [date, setDate] = useState("");
const [note, setNote] = useState("");

useEffect(() => {
if (editingExpense) {
setAmount(editingExpense.amount);
setCategory(
editingExpense.category
);
setDate(editingExpense.date);
setNote(editingExpense.note);
}
}, [editingExpense]);

const clearForm = () => {
setAmount("");
setCategory("");
setDate("");
setNote("");
setEditingExpense(null);
};

const handleSubmit = async (e) => {
e.preventDefault();

const expenseData = {
  amount: Number(amount),
  category,
  date,
  note,
};

try {
  if (editingExpense) {
    await API.put(
      `/expenses/${editingExpense.id}`,
      expenseData
    );

    alert(
      "Expense Updated Successfully"
    );
  } else {
    await API.post(
      "/expenses",
      expenseData
    );

    alert(
      "Expense Added Successfully"
    );
  }

  await fetchExpenses();

  clearForm();
} catch (error) {
  console.log(error);

  alert(
    "Something went wrong"
  );
}


};

return ( <div> <h2>
{editingExpense
? "✏️ Edit Expense"
: "💳 Add Expense"} </h2>


  <form onSubmit={handleSubmit}>
    <input
      type="number"
      placeholder="Amount"
      value={amount}
      onChange={(e) =>
        setAmount(e.target.value)
      }
    />

    <select
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
    >
      <option value="">
        Select Category
      </option>

      <option value="Food">
        Food
      </option>

      <option value="Transport">
        Transport
      </option>

      <option value="Bills">
        Bills
      </option>

      <option value="Entertainment">
        Entertainment
      </option>

      <option value="Other">
        Other
      </option>
    </select>

    <input
      type="date"
      value={date}
      onChange={(e) =>
        setDate(e.target.value)
      }
    />

    <input
      type="text"
      placeholder="Note"
      value={note}
      onChange={(e) =>
        setNote(e.target.value)
      }
    />

    <button type="submit">
      {editingExpense
        ? "Update Expense"
        : "Add Expense"}
    </button>
  </form>
</div>

);
}

export default ExpenseForm;
