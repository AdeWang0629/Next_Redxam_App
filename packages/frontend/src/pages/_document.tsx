import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || "es" };
  }

  render() {
    return (
      <Html
        dir={this.props.locale === "ar" ? "rtl" : "ltr"}
        lang={this.props.locale}
      >
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Rubik:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
