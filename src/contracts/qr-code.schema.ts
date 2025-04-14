import { z } from "zod";

export enum QrStyle {
  Dots = "dots",
  Squares = "squares",
  Fluid = "fluid",
}

export const MAX_SUPPORTED_QR_CODE_SIZE = 8172;
export const MIN_SUPPORTED_QR_CODE_SIZE = 1;

export const qrCodeSchema = z.object({
  value: z.string().url(),
  size: z.number().gte(MIN_SUPPORTED_QR_CODE_SIZE),
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