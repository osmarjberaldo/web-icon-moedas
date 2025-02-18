
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Utensils } from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderFinalizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  tableNumber: string;
}

const OrderFinalizationDialog = ({
  isOpen,
  onClose,
  orderItems,
  subtotal,
  tax,
  total,
  tableNumber,
}: OrderFinalizationDialogProps) => {
  const [observations, setObservations] = useState("");
  const { toast } = useToast();

  const handleSendToKitchen = () => {
    // Aqui você pode adicionar a lógica para enviar o pedido para a cozinha
    toast({
      title: "Pedido enviado para a cozinha",
      description: `Mesa ${tableNumber} - ${orderItems.length} itens`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Confirmação do Pedido - Mesa {tableNumber}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Itens do Pedido</h3>
            <div className="space-y-2">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                  <p>Kz {item.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>Kz {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IVA (5.25%)</span>
              <span>Kz {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>Kz {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="observations" className="text-sm font-medium">
              Observações
            </label>
            <Textarea
              id="observations"
              placeholder="Adicione observações especiais para a cozinha..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Voltar
          </Button>
          <Button
            onClick={handleSendToKitchen}
            className="bg-green-600 hover:bg-green-700"
          >
            <Utensils className="mr-2" size={18} />
            Enviar para Cozinha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFinalizationDialog;
