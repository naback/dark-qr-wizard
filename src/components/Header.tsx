
import React from "react";

const Header = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-2 text-gradient">QR Code Generator</h1>
      <p className="text-muted-foreground max-w-md">
        Generate a QR code from any URL. Enter the URL in the field below and download your QR code.
      </p>
    </header>
  );
};

export default Header;
