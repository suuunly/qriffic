"use client"

import React from "react";
import {QRCode} from "react-qrcode-logo";
import {QrCodeForm} from "~/app/qr-code-form";
import {type QrCodeData, QrStyle} from "~/contracts/qr-code.schema";

const QR_CODE_DISPLAY_SIZE = 250;

export default function Home() {

  const [qrCode, setQrCode] = React.useState<QrCodeData>({
    value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    qrStyle: QrStyle.Dots,
    eyeRadius: 0,
    bgColor: "transparent",
    fgColor: "#000000",
    eyeColor: "#000000",
  });

  return (
    <main>
      <div className={"container py-4 flex-col text-center"}>
        <h1 className={"font-extrabold text-4xl"}>Qriffic</h1>
        <p className={"text-muted-foreground font-light"}>A <b>free</b> QR code generator</p>
      </div>
      <div className={"container flex flex-col space-y-8"}>
        <div className={"flex flex-col items-center"}>
          <QRCode {...qrCode} size={QR_CODE_DISPLAY_SIZE}/>
        </div>

        <QrCodeForm defaultValues={qrCode} onChanged={setQrCode}/>
      </div>

    </main>
  );
}