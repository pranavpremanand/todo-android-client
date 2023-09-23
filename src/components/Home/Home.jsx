import {Button, FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {commonStyles} from '../../styles/commonStyles';
import ToDoItem from './components/ToDoItem/ToDoItem';
import {options} from '../../App';
import {trigger} from 'react-native-haptic-feedback';
import {request} from '../../utils/axiosUtils';
import {useDispatch, useSelector} from 'react-redux';
import {api} from '../../apis';
import {setTodoList} from '../../redux/userSlice';
import {showMessage} from 'react-native-flash-message';
import {useQuery} from 'react-query';

const Home = () => {
  const [todoItem, setTodoItem] = useState('');
  const {todoList} = useSelector(state => state.user);
  const dispatch = useDispatch();

  // add todo
  const handleAddClick = async () => {
    trigger('impactMedium', options);
    if (todoItem !== '') {
      const item = {
        todo: todoItem,
      };
      try {
        const response = await request.post(api.addTodo, item);
        const todos = [{...response.data.data}, ...todoList];
        showMessage({
          message: response.data.message,
          type: 'success',
          duration: 2000,
          icon: 'success',
        });
        setTodoItem('');
        dispatch(setTodoList(todos));
      } catch (err) {
        showMessage({
          message: `${err.message} 😵‍💫`,
          type: 'danger',
          duration: 2000,
          icon: 'danger',
        });
      }
    }
  };

  const deleteToDo = async id => {
    trigger('impactMedium', options);
    try {
      const response = await request.delete(`${api.deleteTodo}/${id}`);
      if (response.data.success) {
        const filteredTodos = todoList.filter(todo => todo._id !== id);
        dispatch(setTodoList(filteredTodos));
        showMessage({
          message: response.data.message,
          type: 'success',
          duration: 2000,
          icon: 'success',
        });
      }
    } catch (err) {
      console.log(err);
      showMessage({
        message: `${err.message} 😵‍💫`,
        type: 'danger',
        duration: 2000,
        icon: 'danger',
      });
    }
  };

  // get todolist
  const {isLoading, isError, error} = useQuery(['todoList'], async () => {
    const response = await request.get(api.getTodoList);
    dispatch(setTodoList(response.data.data));
  });

  if (isError) {
    return showMessage({
      message: error,
      type: 'danger',
      duration: 2000,
      icon: 'danger',
    });
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={require('../../assets/images/backgroundImg.png')}
      />
      <Text style={styles.headingTxt}>
        Tick Task<Text style={{color: '#02B290'}}>&#10003;</Text>
      </Text>
      <TextInput
        style={styles.textInput}
        textColor={commonStyles.blueBg}
        theme={{
          colors: {
            primary: commonStyles.blueBg,
          },
        }}
        label="Type here"
        onChangeText={value => {
          setTodoItem(value);
        }}
        value={todoItem}
      />
      <Button title="Add" onPress={handleAddClick} color={'#5DA3FA'} />
      {/* {todoList.length > 0 && (
        <View
          style={{
            borderBottomColor: '#1B98F5',
            borderBottomWidth: 1,
          }}>
          <Text style={styles.secondaryHeading}>To Do List</Text>
        </View>
      )} */}
      <FlatList
        data={todoList}
        renderItem={item => (
          <ToDoItem data={item.item} deleteToDo={deleteToDo} />
        )}
        keyExtractor={item => item._id}
        numColumns={1}
        style={styles.todoList}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 14,
    gap: 5,
    position: 'relative',
  },
  bgImage: {
    width: '100%',
    height: '56%',
    position: 'absolute',
    bottom: '0%',
  },
  headingTxt: {
    fontSize: 24,
    color: '#1B98F5',
    fontWeight: 'bold',
    letterSpacing: 8,
    borderBottomColor: '#1B98F5',
    borderBottomWidth: 1,
    textAlign: 'center',
    marginBottom: 10,
  },
  secondaryHeading: {
    fontSize: 20,
    color: '#1B98F5',
    fontWeight: 'bold',
    letterSpacing: 8,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#f1f1f1',
    color: commonStyles.darkText,
    borderWidth: 1,
    borderColor: commonStyles.blueBg,
  },
  todoList: {
    marginTop: 20,
  },
});
