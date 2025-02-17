
import { Home, ClipboardList, Users, Menu, Bell, MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 px-4 py-2">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <Home size={24} />
          <span className="text-sm">Home</span>
        </Link>
        <Link to="/orders" className={`nav-item ${location.pathname === "/orders" ? "active" : ""}`}>
          <ClipboardList size={24} />
          <span className="text-sm">Orders</span>
        </Link>
        <div className="relative -mt-8">
          <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
            <Menu size={24} className="text-primary-foreground" />
          </button>
        </div>
        <Link to="/tables" className={`nav-item ${location.pathname === "/tables" ? "active" : ""}`}>
          <Users size={24} />
          <span className="text-sm">Tables</span>
        </Link>
        <button className="nav-item">
          <MoreHorizontal size={24} />
          <span className="text-sm">More</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
