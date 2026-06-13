const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// CORS
app.use(cors());

app.use(express.json());

// File Path
const FILE_PATH = path.join(
  __dirname,
  "data",
  "expenses.json"
);

// Create expenses.json if missing
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, "[]");
}

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
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Add Expense
app.post("/expenses", (req, res) => {
  try {
    const { amount, category, date, note } =
      req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({
        message:
          "Amount, Category and Date are required",
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
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Update Expense
app.put("/expenses/:id", (req, res) => {
  try {
    const expenseId = Number(req.params.id);

    const {
      amount,
      category,
      date,
      note,
    } = req.body;

    const expenses = JSON.parse(
      fs.readFileSync(FILE_PATH, "utf8")
    );

    const updatedExpenses = expenses.map(
      (expense) => {
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
      }
    );

    fs.writeFileSync(
      FILE_PATH,
      JSON.stringify(updatedExpenses, null, 2)
    );

    res.json({
      message:
        "Expense Updated Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
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
      (expense) =>
        expense.id !== expenseId
    );

    fs.writeFileSync(
      FILE_PATH,
      JSON.stringify(updatedExpenses, null, 2)
    );

    res.json({
      message:
        "Expense Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
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
      categoryTotals[
        expense.category
      ] =
        (categoryTotals[
          expense.category
        ] || 0) +
        Number(expense.amount);
    });

    res.json({
      totalSpent,
      highestExpense,
      totalExpenses:
        expenses.length,
      categoryTotals,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Start Server
const PORT =
  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

