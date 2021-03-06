import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  AsyncStorage,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TodoList from './TodoList';

class Home extends React.Component {
  render() {
    return (
      <View style={container}>
        <Text>Home Page Test</Text>
        <Button
          title='Get to My Todos!'
          onPress={() => this.props.navigation.navigate('TodoList')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 33
  },
  textFont: {
    fontSize: 28
  },
  inputBox: {
    width: 300,
    height: 40,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  uncomplete: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 40,

  },
  completed: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: '900',
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    lineHeight: 40,
  },
});

const { container, textFont } = styles;

const Routes = StackNavigator({
  Home: { screen: Home },
  TodoList: { screen: TodoList }
});

export default class App extends React.Component {  // Only way to get Routes to work at least on Adroid
  render() {
    return <Routes />
  }
};
