import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AIDiagnosis from "./pages/AIDiagnosis";
import ROICalculator from "./pages/ROICalculator";
import Community from "./pages/Community";
import WeatherForecast from "./pages/WeatherForecast";
import CropPlanning from "./pages/CropPlanning";
import Inventory from "./pages/Inventory";
import MarketPrices from "./pages/MarketPrices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/community" element={<Community />} />
          <Route path="/weather" element={<WeatherForecast />} />
          <Route path="/crop-planning" element={<CropPlanning />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
