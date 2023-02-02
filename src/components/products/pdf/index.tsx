import React from 'react';
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import Header from './header';
import Footer from './footer';
import Body from './body';
import TablePdf from './table';
import { ListProductsQuery } from '../../../gql/types';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    fontFamiy: 'Source Sans',
    fontSize: 12,
    lineHeight: 1.4,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 32,
    height: '100vh',
  },
  top: {
    flex: 1,
  },
  h1: {
    fontSize: 32,
    marginBottom: 16,
  },
});

interface ProductPdfProps {
  items: ListProductsQuery['listProducts']['items'];
}

export default function ProductPdf({ items }: ProductPdfProps) {
  return (
    <Document>
      <Page style={styles.body} wrap>
        <View style={styles.top}>
          <Header />
          <Body body={'Test body'} />
          <TablePdf items={items} />
        </View>
        <View>
          <Footer />
        </View>
      </Page>
    </Document>
  );
}
