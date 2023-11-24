import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function _document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id="modal-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}
