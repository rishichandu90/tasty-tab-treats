
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FoodProvider } from "@/contexts/FoodContext";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import AllFoodsPage from "@/pages/AllFoodsPage";
import RishiFoodsPage from "@/pages/RishiFoodsPage";
import AtthammaFoodsPage from "@/pages/AtthammFoodsPage";
import AmmaFoodsPage from "@/pages/AmmaFoodsPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FoodProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/all-foods" element={<AllFoodsPage />} />
                <Route path="/rishi-foods" element={<RishiFoodsPage />} />
                <Route path="/atthamma-foods" element={<AtthammaFoodsPage />} />
                <Route path="/amma-foods" element={<AmmaFoodsPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="py-4 text-center text-sm text-muted-foreground border-t border-amber-100">
              <p>© {new Date().getFullYear()} Tasty Tab Treats. All rights reserved.</p>
            </footer>
          </div>
        </BrowserRouter>
      </FoodProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
