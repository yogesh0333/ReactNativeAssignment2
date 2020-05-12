import React from 'react';
import {View, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DisplayFetch from './Components/DisplayFetch';
import DataDisplay from './Components/DataDisplay';

const Stack = createStackNavigator();
const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DisplayFetch">
        <Stack.Screen
          name="DisplayFetch"
          component={DisplayFetch}
          options={{title: 'DisplayFetch'}}
          navigation={props.navigation}
        />
        <Stack.Screen
          name="DataDisplay"
          component={DataDisplay}
          options={{title: 'DataDisplay'}}
          navigation={props.navigation}
          route={props.route}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
const styles = StyleSheet.create({});
