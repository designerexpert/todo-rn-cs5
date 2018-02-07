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
// import { StackNavigator } from 'react-navigation';

export default class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            todos: []
        };
    }

    componentDidMount() {
        const todos = AsyncStorage.getItem('todos');
        if (todos != null) {
            todos
                .then(res => {
                    console.log(res);
                    const parsedTodos = JSON.parse(res);
                    this.setState(prevState => {
                        return {
                            todos: parsedTodos
                        }
                    });
                })
                .catch(err => {
                    console.log(err, 'error on retrieval of todos');
                });
        }
    };

    componentWillMount() {
        const todos = this.state.todos.slice();
        AsyncStorage.setItem('todos', JSON.stringify(todos), err => {
            console.log(err, 'Something went wrong setting items');
        });
    };

    handleButtonPress = () => {
        this.setState(prevState => {
            let { text, todos } = prevState;
            return {
                text: '',
                todos: [...todos, { key: text + todos.length, text, completed: false }]
            };
        });
    };

    handleTextChange = text => {
        this.setState({ text });
    };

    handleComplete = (id) => {
        this.setState(prevState => {
            let oldTodos = prevState.todos;
            let comp = oldTodos[id].completed;
            oldTodos[id].completed = !comp;
            return {
                todos: oldTodos
            }
        })
        this.forceUpdate();
    }

    handleDelete = (id) => {
        this.setState(prevState => {
            let oldTodos = prevState.todos;
            oldTodos.splice(id, 1);
            return {
                todos: oldTodos
            }
        })
    }

    render() {
        return (
            <View style={container}>
                {this.state.todos.length === 0 ? (
                    <Text style={textFont}>You're free Oh noes!</Text>
                ) : (
                        <Text style={textFont}>You got stuff to do!</Text>
                    )}
                <TextInput style={styles.inputBox}
                    onChangeText={this.handleTextChange}
                    value={this.state.text}
                    placeholder="Add Todo"
                />
                <Button onPress={() => this.handleButtonPress()} title="Add Todo" />
                <FlatList extraData={this.state}
                    data={this.state.todos}
                    renderItem={({ item, index }) => {
                        if (!item.completed) {
                            return (
                                <View key={item.key} id={index}>
                                    <Text style={styles.uncomplete} onPress={() => this.handleComplete(index)}>
                                        {item.text}
                                    </Text>
                                </View>
                            );
                        } else {
                            return (
                                <View key={item.key} id={index}>
                                    <Text style={styles.completed} onPress={() => this.handleDelete(index)}>
                                        {item.text}
                                    </Text>
                                </View>
                            );
                        }
                    }}
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
