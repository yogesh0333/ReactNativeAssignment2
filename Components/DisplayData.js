import React from 'react';
import {View, Text} from 'react-native';

const DisplayData = props => {
  return (
    <View>
      <Text>
        Title: {'  '} {props.title}
      </Text>
      <Text>
        URL:{'  '} {props.URL}
      </Text>
      <Text>
        Created At :{'  '} {props.created_at}
      </Text>
      <Text>
        Author :{'  '} {props.author}
      </Text>
    </View>
  );
};

export default DisplayData;
