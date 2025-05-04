import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Forums from "./pages/Forums";
import NotFound from "./pages/NotFound";
import { Helmet } from "react-helmet";
import Register from "./pages/Register";
import Footer from "@/components/footer"; 
import LearnMore from "./pages/learn_more"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Helmet titleTemplate="%s | MyChatApp" defaultTitle="MyChatApp" />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/features" element={<LearnMore/>} />
          </Routes>
          
          {/* Footer will appear on all pages */}
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
