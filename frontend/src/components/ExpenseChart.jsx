import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ expenses }) {
  const categoryData = {};

  expenses.forEach((expense) => {
    const category = expense.category;

    categoryData[category] =
      (categoryData[category] || 0) +
      Number(expense.amount);
  });

  const chartData = Object.keys(categoryData).map(
    (category) => ({
      name: category,
      value: categoryData[category],
    })
  );

  const COLORS = [
    "#FF6B9D",
    "#FF9F43",
    "#8B5CF6",
    "#00C49F",
    "#3B82F6",
    "#FACC15",
  ];

  return (
    <div className="chart-container">
      <h2>📊 Expense Distribution</h2>

      {chartData.length === 0 ? (
        <div className="empty-chart">
          No expense data available
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `₹${value}`,
                "Amount",
              ]}
              contentStyle={{
                background: "#211942",
                border:
                  "1px solid #31285f",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseChart;