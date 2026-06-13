import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function YearlyReport({ expenses }) {
  const yearlyData = {};

  expenses.forEach((expense) => {
    const year = new Date(
      expense.date
    ).getFullYear();

    yearlyData[year] =
      (yearlyData[year] || 0) +
      Number(expense.amount);
  });

  const data = Object.keys(yearlyData).map(
    (year) => ({
      year,
      amount: yearlyData[year],
    })
  );

  return (
    <div className="chart-container">
      <h2>📈 Yearly Expense Trend</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>
          <XAxis dataKey="year" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#8b5cf6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default YearlyReport;