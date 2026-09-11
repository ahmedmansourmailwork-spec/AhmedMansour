import { Archivo, Instrument_Serif, IBM_Plex_Sans_Arabic, Alexandria } from "next/font/google";

/** Latin workhorse — industrial grotesk, set enormous and tight. */
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

/** The single editorial accent. One italic word per spread, never more. */
export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

/** Arabic body — high legibility at long paragraph lengths. */
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
});

/** Arabic display — carries the weight the grotesk carries in Latin. */
export const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-alexandria",
  display: "swap",
});

export const fontVariables = [
  archivo.variable,
  instrument.variable,
  plexArabic.variable,
  alexandria.variable,
].join(" ");
