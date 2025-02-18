
import { Home, ClipboardList, Users, Bell, MoreVertical } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Bell size={24} className="text-primary-foreground" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Order</DialogTitle>
                <DialogDescription>
                  Create a new order by selecting items from the menu.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Aqui irá o conteúdo do formulário de novo pedido */}
                <p className="text-muted-foreground">Order form will be implemented here</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Link to="/tables" className={`nav-item ${location.pathname === "/tables" ? "active" : ""}`}>
          <Users size={24} />
          <span className="text-sm">Tables</span>
        </Link>
        <button className="nav-item">
          <MoreVertical size={24} />
          <span className="text-sm">More</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
