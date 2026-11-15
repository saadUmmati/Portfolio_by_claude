import { Archivo } from "next/font/google";

// Display + body face. Archivo is a variable font with a WIDTH axis (62-125), which the
// <StretchText> hover effect animates. Swap this one line to try another width-axis font.
export const display = Archivo({ subsets: ["latin"], axes: ["wdth"], display: "swap" });
