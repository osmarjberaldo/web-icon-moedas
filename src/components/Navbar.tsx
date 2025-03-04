
import { Home, ClipboardList, Users, Bell, MoreVertical } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [partySize, setPartySize] = useState("");

  const handleNewOrder = () => {
    localStorage.setItem("customerName", customerName);
    localStorage.setItem("partySize", partySize);
    setIsDialogOpen(false);
    navigate("/tables");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 px-4 py-2">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <Home size={24} />
          <span className="text-sm">Início</span>
        </Link>
        <Link to="/orders" className={`nav-item ${location.pathname === "/orders" ? "active" : ""}`}>
          <ClipboardList size={24} />
          <span className="text-sm">Pedidos</span>
        </Link>
        <div className="relative -mt-8 flex space-x-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Bell size={24} className="text-primary-foreground" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalhes do Novo Pedido</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome do Cliente (Opcional)</label>
                  <Input
                    placeholder="Digite o nome do cliente"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Número de Pessoas (Opcional)</label>
                  <Input
                    type="number"
                    placeholder="Digite o número de pessoas"
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                  />
                </div>
                <Button onClick={handleNewOrder} className="w-full">
                  Continuar para Selecionar Mesa
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Link to="/tables" className={`nav-item ${location.pathname === "/tables" ? "active" : ""}`}>
          <Users size={24} />
          <span className="text-sm">Mesas</span>
        </Link>
        <button className="nav-item">
          <MoreVertical size={24} />
          <span className="text-sm">Mais</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
