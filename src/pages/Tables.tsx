
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";

interface Table {
  id: number;
  number: number;
  initials: string;
  seats: number;
  status: "Booked" | "Available";
  color?: "primary" | "yellow";
}

const Tables = () => {
  const navigate = useNavigate();
  const customerName = localStorage.getItem("customerName");
  const partySize = localStorage.getItem("partySize");

  useEffect(() => {
    if (!customerName && !partySize && window.location.pathname === "/tables") {
      navigate("/");
    }
  }, [customerName, partySize, navigate]);

  const tables: Table[] = [
    { id: 1, number: 1, initials: "AM", seats: 4, status: "Booked" },
    { id: 2, number: 2, initials: "MB", seats: 6, status: "Available", color: "yellow" },
    { id: 3, number: 3, initials: "JS", seats: 2, status: "Booked" },
    { id: 4, number: 4, initials: "HR", seats: 4, status: "Available", color: "primary" },
    { id: 5, number: 5, initials: "PL", seats: 3, status: "Booked", color: "yellow" },
    { id: 6, number: 6, initials: "RT", seats: 4, status: "Available", color: "primary" },
    { id: 7, number: 7, initials: "LC", seats: 5, status: "Booked", color: "yellow" },
    { id: 8, number: 8, initials: "DP", seats: 5, status: "Available", color: "primary" },
    { id: 9, number: 9, initials: "NK", seats: 6, status: "Booked" },
    { id: 10, number: 10, initials: "SB", seats: 6, status: "Available" },
    { id: 11, number: 11, initials: "GT", seats: 4, status: "Booked", color: "yellow" },
    { id: 12, number: 12, initials: "JS", seats: 6, status: "Available", color: "primary" },
    { id: 13, number: 13, initials: "EK", seats: 2, status: "Booked" },
    { id: 14, number: 14, initials: "QN", seats: 6, status: "Available", color: "primary" },
    { id: 15, number: 15, initials: "TW", seats: 3, status: "Booked", color: "primary" },
  ];

  const handleTableSelect = (table: Table) => {
    if (table.status === "Available") {
      localStorage.setItem("selectedTable", table.number.toString());
      navigate("/menu");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-display font-semibold">Tables</h1>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              All
            </button>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Available
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              onClick={() => handleTableSelect(table)}
              className={`glass-card p-4 ${
                table.status === "Available" ? "cursor-pointer hover:ring-2 hover:ring-primary" : "opacity-50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-medium">Table {table.number}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    table.status === "Available"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {table.status}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium mb-4 ${
                    table.color === "yellow"
                      ? "bg-yellow-500 text-yellow-950"
                      : "bg-green-500 text-green-950"
                  }`}
                >
                  {table.initials}
                </div>
                <p className="text-sm text-muted-foreground">
                  Seats: {table.seats}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tables;
