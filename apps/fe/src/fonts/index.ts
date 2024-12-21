import { cx } from "class-variance-authority";
import localFont from "next/font/local";

const intervarRegular = localFont({
  src: "./Intervar.woff2",
  display: "swap",
  variable: "--intervar-regular",
  weight: "400",
});

const intervarMedium = localFont({
  src: "./Intervar.woff2",
  display: "swap",
  variable: "--intervar-medium",
  weight: "400",
});

const intervarBold = localFont({
  src: "./Intervar.woff2",
  display: "swap",
  variable: "--intervar-bold",
  weight: "700",
});

const globalFontsVariables = cx(
  intervarRegular.variable,
  intervarMedium.variable,
  intervarBold.variable,
);

export default globalFontsVariables;
