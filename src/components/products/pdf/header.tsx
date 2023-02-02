import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    paddingBottom: 16,
  },
  h1: {
    fontSize: 24,
    fonttWeight: 600,
  },
  h2: {
    fontSize: 20,
  },
  left: {
    flex: 1,
  },
  right: {
    // textAlign: 'right',
  },
});

function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.h1}>Crhis, Inc.</Text>
        <Text>1911 N Sayre Ave</Text>
        <Text>Colombia</Text>
        <Text>(773) 111-2033</Text>
        <Text>test@test.com</Text>
      </View>
      <View style={styles.right}>
        <Text>
          {new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(new Date())}
        </Text>
      </View>
    </View>
  );
}

export default Header;
