import { useState } from "react";

function Sidebar({
  activeTab,
  setActiveTab,
}) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <aside
        className={`sidebar ${
          open ? "open" : "closed"
        }`}
      >
        <h2>💸 Expense Tracker</h2>

        <ul>
          <li
            className={
              activeTab === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("dashboard")
            }
          >
            📊 Dashboard
          </li>

          <li
            className={
              activeTab === "expenses"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("expenses")
            }
          >
            💰 Expenses
          </li>

          <li
            className={
              activeTab === "analytics"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("analytics")
            }
          >
            📈 Analytics
          </li>

          <li
            className={
              activeTab === "reports"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("reports")
            }
          >
            📄 Reports
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;