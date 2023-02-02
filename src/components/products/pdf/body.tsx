import * as React from 'react';

import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    borderTop: '1px double #666',
    marginTop: 24,
    paddingTop: 24,
  },
  bold: {
    fontSize: 11,
  },
  body: {
    borderLeft: '1px solid #aaa',
    lineHeight: 1.8,
    marginLeft: 4,
    marginTop: 8,
    paddingLeft: 8,
  },
});

interface BodyProps {
  body: string;
}

function Body({ body }: BodyProps) {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 8 }}>Location Colombia</Text>
      <Text style={styles.bold}>Company name:</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

export default Body;
