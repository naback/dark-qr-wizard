
import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div 
      className={cn(
        "min-h-screen w-full bg-gradient-to-bl from-background via-background to-background/80 flex flex-col items-center justify-center px-4 py-8", 
        className
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
