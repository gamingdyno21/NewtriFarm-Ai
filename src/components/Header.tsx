import { Button } from "@/components/ui/button";
import { Leaf, Menu, Bell, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/ai-diagnosis", label: "AI Diagnosis" },
    { path: "/roi-calculator", label: "ROI Calculator" },
    { path: "/weather", label: "Weather" },
    { path: "/crop-planning", label: "Planning" },
    { path: "/inventory", label: "Inventory" },
    { path: "/market-prices", label: "Market Prices" },
    { path: "/community", label: "Community" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-hero rounded-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-farm-green">NutriFarm AI</h1>
              <p className="text-xs text-muted-foreground">Precision Farming</p>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-4">
          {navigationItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
                isActive(item.path) 
                  ? 'text-primary bg-primary/10' 
                  : 'hover:text-primary hover:bg-muted/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;