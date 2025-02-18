
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderItem extends MenuItem {
  total: number;
}

const Menu = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const categories = [
    { id: 1, name: "Starters", items: 6, color: "bg-[#D84C4C]" },
    { id: 2, name: "Main Course", items: 6, color: "bg-[#6C5DD3]" },
    { id: 3, name: "Beverages", items: 6, color: "bg-[#B548C6]" },
    { id: 4, name: "Soups", items: 6, color: "bg-[#916E45]" },
    { id: 5, name: "Desserts", items: 4, color: "bg-[#2B3375]" },
    { id: 6, name: "Pizzas", items: 3, color: "bg-[#3A8242]" },
    { id: 7, name: "Alcoholic Drinks", items: 6, color: "bg-[#C84C4C]" },
    { id: 8, name: "Salads", items: 5, color: "bg-[#7C5DD3]" },
  ];

  const menuItems: MenuItem[] = [
    { id: 1, name: "Paneer Tikka", price: 250, quantity: 0 },
    { id: 2, name: "Chicken Tikka", price: 300, quantity: 0 },
    { id: 3, name: "Tandoori Chicken", price: 350, quantity: 0 },
    { id: 4, name: "Samosa", price: 100, quantity: 0 },
    { id: 5, name: "Aloo Tikki", price: 120, quantity: 0 },
    { id: 6, name: "Hara Bhara Kebab", price: 220, quantity: 0 },
  ];

  const handleQuantityChange = (itemId: number, increment: boolean) => {
    const item = menuItems.find((item) => item.id === itemId);
    if (!item) return;

    const existingItem = orderItems.find((orderItem) => orderItem.id === itemId);
    if (existingItem) {
      if (increment) {
        setOrderItems(
          orderItems.map((orderItem) =>
            orderItem.id === itemId
              ? {
                  ...orderItem,
                  quantity: orderItem.quantity + 1,
                  total: (orderItem.quantity + 1) * orderItem.price,
                }
              : orderItem
          )
        );
      } else if (existingItem.quantity > 0) {
        setOrderItems(
          orderItems.map((orderItem) =>
            orderItem.id === itemId
              ? {
                  ...orderItem,
                  quantity: orderItem.quantity - 1,
                  total: (orderItem.quantity - 1) * orderItem.price,
                }
              : orderItem
          ).filter((item) => item.quantity > 0)
        );
      }
    } else if (increment) {
      setOrderItems([
        ...orderItems,
        { ...item, quantity: 1, total: item.price },
      ]);
    }
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.0525;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Menu Section */}
      <div className="flex-1 p-4 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-white">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.color} rounded-lg p-4 cursor-pointer transition-transform hover:scale-105`}
            >
              <h3 className="text-lg font-semibold text-white">
                {category.name}
              </h3>
              <p className="text-sm text-white/80">{category.items} Items</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(item.id, false)}
                  className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"
                >
                  -
                </button>
                <span>
                  {orderItems.find((orderItem) => orderItem.id === item.id)
                    ?.quantity || 0}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.id, true)}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Receipt */}
      <div className="w-96 bg-card border-l border-border p-4 hidden lg:block">
        <div className="sticky top-4">
          <h2 className="text-xl font-bold mb-2">Order Details</h2>
          <div className="text-sm text-muted-foreground mb-6">
            Table No: 2
            <br />
            {new Date().toLocaleString()}
          </div>

          <div className="space-y-4 mb-6">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    x{item.quantity}
                  </p>
                </div>
                <p>₹{item.total}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between">
              <p className="text-muted-foreground">Items({orderItems.length})</p>
              <p>₹{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-muted-foreground">Tax(5.25%)</p>
              <p>₹{tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-border">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="w-full py-2 px-4 bg-accent text-accent-foreground rounded-lg">
              Print Receipt
            </button>
            <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
