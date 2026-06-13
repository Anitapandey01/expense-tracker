const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = "./data/expenses.json";

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Get All Expenses
app.get("/expenses", (req, res) => {
  try {
    const expenses = JSON.parse(
      fs.readFileSync(FILE_PATH, "utf8")
    );

    res.json(expenses);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Add Expense
app.post("/expenses", (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({
        message: "Amount, Category and Date are required",
      });
    }

    const expenses = JSON.parse(
      fs.readFileSync(FILE_PATH, "utf8")
    );

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      category,
      date,
      note: note || "",
    };

    expenses.push(newExpense);

    fs.writeFileSync(
      FILE_PATH,
      JSON.stringify(expenses, null, 2)
    );

    res.status(201).json({
      message: "Expense Added Successfully",
      expense: newExpense,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Update Expense
app.put("/expenses/:id", (req, res) => {
  try {
    const expenseId = Number(req.params.id);

    const { amount, category, date, note } = req.body;

    const expenses = JSON.parse(
      fs.readFileSync(FILE_PATH, "utf8")
    );

    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === expenseId) {
        return {
          ...expense,
          amount: Number(amount),
          category,
          date,
          note,
        };
      }

      return expense;
    });

    fs.writeFileSync(
      FILE_PATH,
      JSON.stringify(updatedExpenses, null, 2)
    );

    res.json({
      message: "Expense Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Delete Expense
app.delete("/expenses/:id", (req, res) => {
  try {
    const expenseId = Number(req.params.id);

    const expenses = JSON.parse(
      fs.readFileSync(FILE_PATH, "utf8")
    );

    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );

    fs.writeFileSync(
      FILE_PATH,
      JSON.stringify(updatedExpenses, null, 2)
    );

    res.json({
      message: "Expense Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Summary Route
app.get("/summary", (req, res) => {
  try {
    const expenses = JSON.parse(
      fs.readFileSync(FILE_PATH, "utf8")
    );

    const totalSpent = expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
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

    const categoryTotals = {};

    expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += Number(
          expense.amount
        );
      } else {
        categoryTotals[expense.category] = Number(
          expense.amount
        );
      }
    });

    res.json({
      totalSpent,
      highestExpense,
      totalExpenses: expenses.length,
      categoryTotals,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Start Server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});