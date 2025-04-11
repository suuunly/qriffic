import { z } from "zod";

export enum QrStyle {
  Dots = "dots",
  Squares = "squares",
  Fluid = "fluid",
}

export const qrCodeSchema = z.object({
  value: z.string().url(),
  size: z.number().gte(0),
  qrStyle: z.nativeEnum(QrStyle),
  eyeRadius: z.number().gte(0),
  bgColor: z.string(),
  fgColor: z.string(),
  eyeColor: z.string(),

  logoImage: z.string(),
  logoHeight: z.number().gte(0),
  logoWidth: z.number().gte(0),
  logoOpacity: z.number().gte(0).lte(1),
})

export type QrCodeData = z.infer<typeof qrCodeSchema>;