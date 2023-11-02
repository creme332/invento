import "@mantine/core/styles.css";
import Head from "next/head";
import {
  MantineProvider,
  Container,
  LoadingOverlay,
  Modal,
  Alert,
} from "@mantine/core";
import { theme } from "../theme";
import Header from "../components/HeaderMegaMenu";
import Footer from "../components/FooterSimple";
import { IconInfoCircle } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function App({ Component, pageProps }: any) {
  const env = process.env.NODE_ENV;
  const BACKEND_URL = env === "development" ? "http://localhost:3001" : "https://invento-backend.onrender.com/";
  const [modalOpened, modalHandler] = useDisclosure(false);
  const [modalText, setModalText] = useState("hello");
  const [loading, loadingHandler] = useDisclosure(false);

  function displayError(message: string) {
    // if error obtained, display error in modal
    setModalText(message);
    modalHandler.open();
  }

  function toggleLoader(switchOn: Boolean) {
    if (switchOn) {
      loadingHandler.open();
    } else {
      loadingHandler.close();
    }
  }
  
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Head>
        <title>invento</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏨</text></svg>"
        />
        <meta
          name="description"
          content="A basic inventory management app with search capabilities built with MERN stack."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <Modal
        padding={0}
        opened={modalOpened}
        onClose={modalHandler.close}
        withCloseButton={false}
      >
        <Alert
          variant="filled"
          color="red"
          title="Error"
          icon={<IconInfoCircle />}
        >
          {modalText}
        </Alert>
      </Modal>
      <Container pos={"relative"}>
        {" "}
        {
          // ! Note that position: relative is required for loading overlay to work
        }
        <LoadingOverlay
          visible={loading}
          zIndex={100}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Component
          {...pageProps}
          displayError={displayError}
          backendURL={BACKEND_URL}
          toggleLoader={toggleLoader}
        />
      </Container>
      <Footer />
    </MantineProvider>
  );
}
