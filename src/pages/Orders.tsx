
import { useState } from "react";
import { receipt, printer, trash, calendar } from "lucide-react";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  table: number;
  items: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  total: number;
  customerName: string;
  time: string;
}

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const orders: Order[] = [
    {
      id: "ORD001",
      table: 1,
      items: 4,
      status: "pending",
      total: 1250,
      customerName: "John Doe",
      time: "10:30 AM"
    },
    {
      id: "ORD002",
      table: 3,
      items: 2,
      status: "preparing",
      total: 850,
      customerName: "Jane Smith",
      time: "10:45 AM"
    },
    {
      id: "ORD003",
      table: 5,
      items: 6,
      status: "ready",
      total: 2100,
      customerName: "Mike Johnson",
      time: "11:00 AM"
    },
    {
      id: "ORD004",
      table: 2,
      items: 3,
      status: "completed",
      total: 950,
      customerName: "Sarah Williams",
      time: "11:15 AM"
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

  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-semibold">Orders</h1>
              <p className="text-muted-foreground">
                Manage and track all orders
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <calendar className="w-4 h-4 mr-2" />
                Today
              </Button>
              <Button variant="outline" size="sm">
                <printer className="w-4 h-4 mr-2" />
                Print Report
              </Button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex gap-2">
            {["all", "pending", "preparing", "ready", "completed", "cancelled"].map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>Table {order.table}</TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell>₹{order.total}</TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${getStatusColor(order.status)} capitalize`}
                        variant="outline"
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost">
                          <receipt className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500">
                          <trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
