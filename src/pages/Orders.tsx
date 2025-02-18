
import { useState } from "react";
import { Receipt, Printer, Trash, Calendar, Plus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Order {
  id: string;
  table: number;
  items: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  total: number;
  customerName: string;
  time: string;
  type: "Dine in" | "Takeaway" | "Delivery";
}

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  const orders: Order[] = [
    {
      id: "#101",
      table: 1,
      items: 8,
      status: "ready",
      total: 25000.00,
      customerName: "Amrit Raj",
      time: "18 de Janeiro de 2025 20:32",
      type: "Dine in"
    },
    {
      id: "#102",
      table: 3,
      items: 8,
      status: "ready",
      total: 25000.00,
      customerName: "Amrit Raj",
      time: "18 de Janeiro de 2025 20:32",
      type: "Dine in"
    },
    {
      id: "#103",
      table: 5,
      items: 8,
      status: "ready",
      total: 25000.00,
      customerName: "Amrit Raj",
      time: "18 de Janeiro de 2025 20:32",
      type: "Dine in"
    }
  ];

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-500",
      preparing: "bg-blue-500/20 text-blue-500",
      ready: "bg-green-500/20 text-green-500",
      completed: "bg-purple-500/20 text-purple-500",
      cancelled: "bg-red-500/20 text-red-500"
    };
    return colors[status];
  };

  const getStatusText = (status: Order["status"]) => {
    const statusTexts = {
      pending: "Pendente",
      preparing: "Preparando",
      ready: "Pronto",
      completed: "Concluído",
      cancelled: "Cancelado"
    };
    return statusTexts[status];
  };

  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const handleAddItems = (order: Order) => {
    localStorage.setItem("selectedTable", order.table.toString());
    localStorage.setItem("existingOrderId", order.id);
    localStorage.setItem("customerName", order.customerName);
    navigate("/menu");
  };

  const handleGenerateInvoice = (order: Order) => {
    // Guardar informações do pedido no localStorage para usar na página de finalização
    localStorage.setItem("orderToFinalize", JSON.stringify(order));
    
    // Navegar para a página de finalização de conta
    navigate(`/orders/${order.id}/finalize`);
    
    toast({
      title: "Gerando fatura final",
      description: `Preparando fatura para Mesa ${order.table} - Pedido ${order.id}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Calendar className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-semibold">Pedidos</h1>
          </div>
          <div className="flex gap-2">
            {[
              { key: "all", label: "Todos" },
              { key: "preparing", label: "Em Preparo" },
              { key: "ready", label: "Prontos" },
              { key: "completed", label: "Concluídos" }
            ].map((status) => (
              <Button
                key={status.key}
                variant={selectedStatus === status.key ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedStatus(status.key)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
              >
                {status.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-500 text-yellow-950 w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-lg">
                    AR
                  </div>
                  <div>
                    <h3 className="font-semibold">{order.customerName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.id}/Mesa {order.table}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="outline"
                  className={getStatusColor(order.status)}
                >
                  {getStatusText(order.status)}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mb-4">
                {order.time}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  Pronto para servir
                </div>
                <div className="text-sm">{order.items} Itens</div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-semibold">Kz {order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => handleGenerateInvoice(order)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-100"
                    >
                      <Receipt className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-500">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {order.status !== "completed" && order.status !== "cancelled" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Adicionar Mais Itens
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Itens ao Pedido {order.id}</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 mt-4">
                        <p className="text-sm text-muted-foreground">
                          Detalhes do pedido atual:
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Mesa</p>
                            <p className="font-medium">Mesa {order.table}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Itens</p>
                            <p className="font-medium">{order.items} itens</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total</p>
                            <p className="font-medium">Kz {order.total.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <Badge variant="outline" className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-4"
                          onClick={() => handleAddItems(order)}
                        >
                          Continuar para o Menu
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
