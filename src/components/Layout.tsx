
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "3s" }}></div>
      
      <Header />
      <main className="flex-1 mt-24 p-4 md:p-6 max-w-7xl w-full mx-auto z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
