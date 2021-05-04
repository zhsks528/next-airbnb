import { Fragment } from "react";
import { AppProps } from "next/app";
import GlobalStyle from "styles/GlobalStyle";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
