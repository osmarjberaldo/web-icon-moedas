
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
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
            <ThemeToggle />
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
  );
};

export default Header;
