import { ColorModeScript } from '@chakra-ui/core';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  static getInitialProps(
    context: DocumentContext
  ): Promise<DocumentInitialProps> {
    return Document.getInitialProps(context);
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode="system" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
