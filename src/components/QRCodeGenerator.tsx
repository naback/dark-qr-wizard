
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { QrCode, Download, Link } from "lucide-react";
import { toast } from "sonner";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const validateUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    setIsValidUrl(validateUrl(inputUrl));
  };

  const downloadQRCode = () => {
    if (!isValidUrl) {
      toast.error("Please enter a valid URL first");
      return;
    }

    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `qrcode-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR Code downloaded successfully!");
  };

  const copyLinkToClipboard = () => {
    if (!isValidUrl) {
      toast.error("Please enter a valid URL first");
      return;
    }

    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy URL");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="w-full space-y-4">
        <div className="flex items-center relative">
          <Input
            type="url"
            placeholder="Enter URL to generate QR Code"
            value={url}
            onChange={handleUrlChange}
            className="pr-10 bg-secondary/80 border-secondary focus-visible:ring-primary"
          />
          <QrCode 
            className={`absolute right-3 h-5 w-5 transition-colors ${
              isValidUrl ? "text-primary animate-pulse-light" : "text-muted-foreground"
            }`} 
          />
        </div>

        <div ref={qrRef} className="flex flex-col items-center justify-center p-6">
          <Card className={`p-4 glass-morphism transition-all duration-300 ${
            !isValidUrl && url === "" ? "opacity-50" : "opacity-100"
          }`}>
            {url ? (
              <QRCodeCanvas
                value={url}
                size={200}
                bgColor={"#000000"}
                fgColor={"#a855f7"}
                level="H"
                includeMargin={true}
              />
            ) : (
              <QRCodeCanvas
                value="https://example.com"
                size={200}
                bgColor={"#1a1a1a"}
                fgColor={"#666666"}
                level="H"
                includeMargin={true}
              />
            )}
          </Card>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            onClick={downloadQRCode}
            className={`w-1/2 gap-2 ${!isValidUrl ? "opacity-70 pointer-events-none" : ""}`}
            disabled={!isValidUrl}
          >
            <Download size={18} />
            Download
          </Button>
          <Button
            onClick={copyLinkToClipboard}
            variant="outline"
            className={`w-1/2 gap-2 border-primary/30 hover:bg-primary/10 ${!isValidUrl ? "opacity-70 pointer-events-none" : ""}`}
            disabled={!isValidUrl}
          >
            <Link size={18} />
            Copy URL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
