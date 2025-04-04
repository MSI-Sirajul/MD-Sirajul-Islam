
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Skills from "./pages/Skills";
import Certificates from "./pages/Certificates";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { EditProvider } from "./contexts/EditContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <EditProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </EditProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
