import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Stylesheet, InjectionMode, resetIds } from '@fluentui/react';

// Do this in file scope to initialize the stylesheet before Fluent UI React components are imported.
const stylesheet = Stylesheet.getInstance();

// Set the config.
stylesheet.setConfig({
  injectionMode: InjectionMode.none,
  namespace: 'server'
});

// Now set up the document, and just reset the stylesheet.
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    stylesheet.reset();
    resetIds();

    const page = renderPage(function AppRenderer(App) {
        return function ComponentRenderer(props) {
            return <App {...props} />
        }
    });

    return { ...page, styleTags: stylesheet.getRules(true), serializedStylesheet: stylesheet.serialize()  };
  }

  render() {
    return (
      <Html>
        <Head>
          <style type="text/css" dangerouslySetInnerHTML={{ __html: this.props.styleTags }} />
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
            window.FabricConfig = window.FabricConfig || {};
            window.FabricConfig.serializedStylesheet = ${this.props.serializedStylesheet};
          ` }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}