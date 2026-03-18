import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "components/layout/Sidebar";
import { Topbar } from "components/layout/Topbar";

export const AppLayout = () => {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!navOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  return (
    <div className={`app-shell ${navOpen ? "nav-open" : ""}`.trim()}>
      <Sidebar className={navOpen ? "mobile-open" : ""} onNavigate={() => setNavOpen(false)} />
      <button className={`sidebar-backdrop ${navOpen ? "open" : ""}`.trim()} type="button" aria-label="Close navigation" onClick={() => setNavOpen(false)} />
      <div className="app-content-wrap">
        <Topbar onOpenNav={() => setNavOpen(true)} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
