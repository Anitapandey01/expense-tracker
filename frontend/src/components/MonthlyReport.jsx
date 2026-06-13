import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function MonthlyReport({ expenses }) {
  const monthlyData = {};

  expenses.forEach((expense) => {
    const month = new Date(
      expense.date
    ).toLocaleString("default", {
      month: "short",
    });

    monthlyData[month] =
      (monthlyData[month] || 0) +
      Number(expense.amount);
  });

  const data = Object.keys(monthlyData).map(
    (month) => ({
      month,
      amount: monthlyData[month],
    })
  );

  return (
    <div className="chart-container">
      <h2>📊 Monthly Expense Trend</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#ff6b9d"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyReport;