import {z} from "zod";

export enum QrStyle {
  Dots = "dots",
  Squares = "squares",
}

export const qrCodeSchema = z.object({
  value: z.string().url(),
  style: z.nativeEnum(QrStyle),
  eyeRadius: z.number().gte(0),
  // bgColor: z.string(),
  // fgColor: z.string(),
})

export type QrCodeData = z.infer<typeof qrCodeSchema>;