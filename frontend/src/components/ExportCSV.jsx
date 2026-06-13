function ExportCSV({ expenses }) {
  const exportToCSV = () => {
    const headers = [
      "Amount",
      "Category",
      "Date",
      "Note",
    ];

    const rows = expenses.map((expense) => [
      expense.amount,
      expense.category,
      expense.date,
      expense.note,
    ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "expenses.csv";

    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportToCSV}>
      Export CSV
    </button>
  );
}

export default ExportCSV;
