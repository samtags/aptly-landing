import localFont from "next/font/local";

const Satoshi = localFont({
    src: [{path: "../../../public/fonts/Satoshi-Variable.ttf"}],
    variable: "--font-Satoshi"
})

const Inter = localFont({
    src: [{path: "../../../public/fonts/Inter-Regular.otf"}],
    variable: "--font-Inter"
})

const InterBold = localFont({
    src: [{path: "../../../public/fonts/Inter-Bold.otf"}],
    variable: "--font-InterBold"
})

export { Satoshi, Inter, InterBold };