"use client"

import { DownloadIcon } from "lucide-react";
import React, { useMemo } from "react";
import { QRCode } from "react-qrcode-logo";
import { twMerge } from "tailwind-merge";
import { QrCodeForm } from "~/app/qr-code-form";
import { Button } from "~/components/ui/button";
import { type QrCodeData, QrStyle } from "~/contracts/qr-code.schema";
import { useDownload } from "./hooks/use-download";

// todo: make this responsive, and abstract these calculations into a method/hook
const QR_CODE_DISPLAY_SIZE = 300
const QR_CODE_DISPLAY_MAX_SCALE_FACTOR = 8;
const QR_CODE_DEFAULT_LOGO_SIZE = 50;

export default function Home() {

  const downloadQrCode = useDownload({
    id: "qriffic-canvas",
    fileName: "qriffic-code.png",
    mimeType: "image/png"
  });

  const [qrCode, setQrCode] = React.useState<QrCodeData>({
    value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    qrStyle: QrStyle.Dots,
    eyeRadius: 0,
    bgColor: "transparent",
    fgColor: "#000000",
    eyeColor: "#000000",
    logoImage: "",
    logoHeight: QR_CODE_DEFAULT_LOGO_SIZE,
    logoWidth: QR_CODE_DEFAULT_LOGO_SIZE,
    logoOpacity: 1,
    size: QR_CODE_DISPLAY_SIZE,
  });

  const viewSize = useMemo(() => {
    return `w-[${QR_CODE_DISPLAY_SIZE}px] h-[${QR_CODE_DISPLAY_SIZE}px]`
  }, [])

  const scale = useMemo(() => {
    const scale = QR_CODE_DISPLAY_SIZE / qrCode.size
    return Math.min(scale, QR_CODE_DISPLAY_SIZE / QR_CODE_DISPLAY_MAX_SCALE_FACTOR)
  }, [qrCode.size])

  return (
    <main>
      <div className={"container py-4 flex-col text-center"}>
        <h1 className={"font-extrabold text-4xl"}>Qriffic</h1>
        <p className={"text-muted-foreground font-light"}>A <b>free</b> QR code generator</p>
      </div>
      <div className={"container flex flex-col lg:flex-row-reverse space-y-8"}>
        <div>
          <div className="flex flex-col gap-4 container lg:sticky lg:top-0">
            <div className={twMerge(viewSize, "h-[300px] mt-0 lg:mt-16 flex items-center justify-center -z-50")} style={{ transform: `scale(${scale})`}}>
              <QRCode {...qrCode} id="qriffic-canvas" />
            </div>
            <Button onClick={downloadQrCode} variant="default" size="sm" className="w-fit mx-auto">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <QrCodeForm defaultValues={qrCode} onChanged={setQrCode}/>
        </div>
      </div>

    </main>
  );
}