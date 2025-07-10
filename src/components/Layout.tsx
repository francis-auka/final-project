
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">
        <div className="container-modern content-spacing">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
