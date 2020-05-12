import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DataTable = props => {
  return (
    <View style={styles.container}>
      <View style={styles.data}>
        <Text style={styles.heading}>Title: {'  '}</Text>
        <Text style={styles.content}>{props.title}</Text>
      </View>
      <View style={styles.data}>
        <Text style={styles.heading}>URL:{'  '}</Text>
        <Text style={styles.content}>{props.URL}</Text>
      </View>
      <View style={styles.data}>
        <Text style={styles.heading}>Created At :{'  '}</Text>
        <Text style={styles.content}>{props.created_at}</Text>
      </View>
      <View style={styles.data}>
        <Text style={styles.heading}>Author :{'  '}</Text>
        <Text style={styles.content}>{props.author}</Text>
      </View>
    </View>
  );
};

export default DataTable;

const styles = StyleSheet.create({
  container: {
    borderColor: '#2E3436',
    borderWidth: 1,
    borderRadius: 25,
    margin: 20,
    padding: 20,
  },
  data: {
    flexDirection: 'row',
    margin: 5,
  },
  heading: {
    fontSize: 16,
  },
  content: {
    flexShrink: 1,
  },
});
