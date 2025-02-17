
import Navbar from "@/components/Navbar";
import MenuCategory from "@/components/MenuCategory";
import { Search, Bell } from "lucide-react";

const Index = () => {
  const categories = [
    { icon: "🍽️", name: "Starters", itemCount: 6, color: "#ef4444" },
    { icon: "🍛", name: "Main Course", itemCount: 12, color: "#8b5cf6" },
    { icon: "🥤", name: "Beverages", itemCount: 8, color: "#ec4899" },
    { icon: "🍲", name: "Soups", itemCount: 4, color: "#ca8a04" },
    { icon: "🍰", name: "Desserts", itemCount: 6, color: "#4f46e5" },
    { icon: "🍕", name: "Pizzas", itemCount: 8, color: "#059669" }
  ];

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-display font-semibold">Marmite</h1>
            <button className="p-2 rounded-full hover:bg-muted transition-colors">
              <Bell size={24} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="search"
              placeholder="Search menu..."
              className="w-full bg-muted rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <MenuCategory
              key={category.name}
              icon={category.icon}
              name={category.name}
              itemCount={category.itemCount}
              color={category.color}
            />
          ))}
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default Index;
