
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 mt-24 p-4 md:p-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
