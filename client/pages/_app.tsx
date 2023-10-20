import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider, Container, LoadingOverlay } from "@mantine/core";
import { theme } from "../theme";
import Header from "../components/HeaderMegaMenu";
import Footer from "../components/FooterSimple";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export default function App({ Component, pageProps }: any) {
  const [fetchingData, setFetchingData] = useState(true);
  const [visible, { toggle }] = useDisclosure(true);

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
      <Container pos={"relative"}>
        {" "}
        {
          // ! Note that position: relative is required for loading overlay to work
        }
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Component fetchingData={fetchingData} {...pageProps} />
      </Container>
      <Footer />
    </MantineProvider>
  );
}
