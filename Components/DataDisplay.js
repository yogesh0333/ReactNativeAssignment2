import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const DataDisplay = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.text}>{JSON.stringify(data)}</Text>
    </ScrollView>
  );
};

export default DataDisplay;
const styles = StyleSheet.create({
  container: {
    margin: 25,
  },
  text: {
    fontSize: 18,
  },
});
