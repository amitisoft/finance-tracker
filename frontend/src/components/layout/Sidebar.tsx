import { NavLink } from "react-router-dom";
import { FiActivity, FiCreditCard, FiDollarSign, FiHome, FiPieChart, FiRefreshCw, FiSettings, FiTarget } from "react-icons/fi";

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

const items = [
  { to: "/", label: "Dashboard", icon: <FiHome /> },

  { to: "/transactions", label: "Transactions", icon: <FiActivity /> },
  { to: "/accounts", label: "Accounts", icon: <FiCreditCard /> },

  { to: "/budgets", label: "Budgets", icon: <FiPieChart /> },
  { to: "/goals", label: "Goals", icon: <FiTarget /> },
  { to: "/recurring", label: "Recurring", icon: <FiRefreshCw /> },

  { to: "/reports", label: "Reports", icon: <FiDollarSign /> },

  { to: "/settings", label: "Settings", icon: <FiSettings /> }
];

export const Sidebar = ({ className, onNavigate }: SidebarProps) => (
  <aside className={`sidebar ${className ?? ""}`.trim()} aria-label="Main navigation">
    <div className="brand-wrap">
      <div className="brand-mark">FT</div>
      <div className="brand">Personal Finance Tracker</div>
    </div>

    <nav>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          onClick={onNavigate}
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>

    <div className="sidebar-foot">
      <p>Stay consistent</p>
      <small>Log expenses daily to keep insights accurate.</small>
    </div>
  </aside>
);
