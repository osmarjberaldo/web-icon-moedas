
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, CreditCard, Receipt } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
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

const OrderFinalize = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orderData = localStorage.getItem("orderToFinalize");
    if (orderData) {
      setOrder(JSON.parse(orderData));
    }
  }, []);

  const handlePrintInvoice = () => {
    toast({
      title: "Imprimindo fatura",
      description: `Fatura para Mesa ${order?.table} - Pedido ${order?.id} enviada para impressão`,
    });
  };

  const handleProcessPayment = () => {
    toast({
      title: "Processando pagamento",
      description: "Redirecionando para tela de pagamento...",
    });
    // Aqui você pode adicionar a lógica para processar o pagamento
  };

  if (!order) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-semibold">Finalização de Conta</h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Mesa {order.table}</h2>
                  <p className="text-muted-foreground">Pedido {order.id}</p>
                  <p className="text-muted-foreground">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">{order.time}</p>
                  <p className="text-muted-foreground">{order.type}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-4">Resumo do Pedido</h3>
                <div className="space-y-4">
                  {/* Aqui você pode adicionar os itens do pedido quando tiver a lista completa */}
                  <div className="flex justify-between">
                    <span>Total de Itens</span>
                    <span>{order.items} itens</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Kz {order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>IVA (5.25%)</span>
                  <span>Kz {(order.total * 0.0525).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Final</span>
                  <span>Kz {(order.total * 1.0525).toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Button 
                  onClick={handlePrintInvoice}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir Fatura
                </Button>
                <Button 
                  onClick={handleProcessPayment}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Processar Pagamento
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderFinalize;
