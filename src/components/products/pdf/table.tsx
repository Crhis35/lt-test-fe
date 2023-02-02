import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import {  ListProductsQuery } from '../../../gql/types';

const borderColor = '#90e5fc';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
  container: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    backgroundColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  name: {
    width: '60%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  max: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  price: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  available: {
    width: '15%',
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
});

interface TableProps {
  items: ListProductsQuery['listProducts']['items'];
}

export default function TablePdf({ items }: TableProps) {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.container}>
        <Text style={styles.name}>Item Description</Text>
        <Text style={styles.max}>Max</Text>
        <Text style={styles.available}>Available</Text>
        <Text style={styles.price}>Price</Text>
      </View>
      {items?.map((item) => (
        <View style={styles.row} key={item.id}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.max}>{item.stock.max}</Text>
          <Text style={styles.available}>{item.stock.available}</Text>
          <Text style={styles.price}>{item.price.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
}
