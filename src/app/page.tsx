"use client"

import React, { useMemo } from "react";
import { QRCode } from "react-qrcode-logo";
import { twMerge } from "tailwind-merge";
import { QrCodeForm } from "~/app/qr-code-form";
import { type QrCodeData, QrStyle } from "~/contracts/qr-code.schema";

// todo: make this responsive, and abstract these calculations into a method/hook
const QR_CODE_SMALLER_SCREEN_PADDING = 1.3;
const QR_CODE_DISPLAY_SIZE = Math.round(Math.min(window.innerWidth / QR_CODE_SMALLER_SCREEN_PADDING, 400));
const QR_CODE_DISPLAY_MAX_SCALE_FACTOR = 8;

const QR_CODE_DEFAULT_LOGO_SIZE = 50;

const QR_CODE_VIEW_SIZE = `w-[${QR_CODE_DISPLAY_SIZE}px] h-[${QR_CODE_DISPLAY_SIZE}px]`

export default function Home() {

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
      <div className={"container flex flex-col space-y-8"}>
        <div className={"flex flex-col items-center"}>
            <div className={twMerge(QR_CODE_VIEW_SIZE, "flex items-center justify-center")} style={{ transform: `scale(${scale})`}}>
              <QRCode {...qrCode} />
            </div>
        </div>

        <QrCodeForm defaultValues={qrCode} onChanged={setQrCode}/>
      </div>

    </main>
  );
}