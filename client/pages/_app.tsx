import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import Header from "../components/HeaderMegaMenu";
import Footer from "../components/FooterSimple";

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Head>
        <title>invento</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏨</text></svg>"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </MantineProvider>
  );
}
