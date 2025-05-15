
import React from "react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <Layout>
      <Header />
      <Separator className="w-full max-w-md mb-8 bg-primary/20" />
      <QRCodeGenerator />
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Enter any URL and instantly generate a QR code</p>
        <p className="mt-1">© {new Date().getFullYear()} QR Code Generator</p>
      </footer>
    </Layout>
  );
};

export default Index;
