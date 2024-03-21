import Layout from "../components/Layout";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

import "../src/app/theme.css";
import "../src/app/globals.css";

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = usePathname();
  const [protectedRoute, setProtectedRoute] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        html,
        body {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>Magic Box</title>
        <link rel="icon" type="image/x-icon" href="/img/favicon.png" />
      </Head>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
