import { Search, Bell, Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(currentDate);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(currentDate);

  const recentOrders = [
    { id: 1, name: "Amrit Raj", items: 8, table: 3, status: "Ready" },
    { id: 2, name: "Amrit Raj", items: 8, table: 3, status: "Ready" },
    { id: 3, name: "Amrit Raj", items: 8, table: 3, status: "Ready" },
    { id: 4, name: "Amrit Raj", items: 8, table: 3, status: "Ready" },
  ];

  const popularDishes = [
    { id: 1, name: "Butter Chicken", orders: 250, image: "🍗" },
    { id: 2, name: "Palak Paneer", orders: 190, image: "🥬" },
    { id: 3, name: "Hyderabadi Biryani", orders: 300, image: "🍚" },
    { id: 4, name: "Masala Dosa", orders: 220, image: "🥞" },
    { id: 5, name: "Chole Bhature", orders: 270, image: "🥘" },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-display font-semibold">Restro</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="search"
                  placeholder="Search"
                  className="w-[200px] bg-muted rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Bell size={24} />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Amrit Raj</span>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">AR</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-display mb-1">Good Morning, Amrit</h2>
                  <p className="text-muted-foreground">Give your best services for customers 😊</p>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{formattedTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Total Earnings</p>
                      <h3 className="text-4xl font-semibold mt-1">₹512</h3>
                      <p className="text-sm text-green-500 mt-1">1.6% than yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">In Progress</p>
                      <h3 className="text-4xl font-semibold mt-1">16</h3>
                      <p className="text-sm text-green-500 mt-1">3.6% than yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-display font-medium">Recent Orders</h2>
                <button className="text-sm text-primary hover:text-primary/80">View all</button>
              </div>
              <div className="glass-card divide-y divide-border/50">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-medium">
                        AM
                      </div>
                      <div>
                        <h3 className="font-medium">{order.name}</h3>
                        <p className="text-sm text-muted-foreground">{order.items} Items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm">
                        Table No: {order.table}
                      </span>
                      <span className="text-green-500 text-sm">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="w-80">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-display font-medium">Popular Dishes</h2>
                <button className="text-sm text-primary hover:text-primary/80">View all</button>
              </div>
              <div className="space-y-4">
                {popularDishes.map((dish, index) => (
                  <div key={dish.id} className="glass-card p-4 flex items-center gap-4">
                    <span className="text-2xl w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg">
                      {dish.image}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-medium">0{index + 1}</span>
                        <h3 className="font-medium">{dish.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Orders: {dish.orders}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
