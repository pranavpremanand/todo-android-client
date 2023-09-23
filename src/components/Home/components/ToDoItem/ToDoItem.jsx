import {StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import {commonStyles} from '../../../../styles/commonStyles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {request} from '../../../../utils/axiosUtils';
import {api} from '../../../../apis';
import {useDispatch, useSelector} from 'react-redux';
import {setTodoList} from '../../../../redux/userSlice';
import {options} from '../../../../App';
import {trigger} from 'react-native-haptic-feedback';

const ToDoItem = ({data, deleteToDo}) => {
  const [completed, setCompleted] = useState(data.done);
  const [expandText, setExpandText] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const dispatch = useDispatch();
  const {todoList} = useSelector(state => state.user);

  const handleTickChange = async () => {
    trigger('impactMedium', options);
    try {
      const details = {todoId: data._id, status: !completed};
      const response = await request.patch(api.updateTodo, details);
      const updatedTodos = todoList.map(todo => {
        if (todo._id === data._id) {
          todo.done = !completed;
        }
        return todo;
      });
      setCompleted(!completed);
      dispatch(setTodoList(updatedTodos));
      showMessage({
        message: response.data.message,
        type: 'success',
        duration: 2000,
        icon: 'success',
      });
    } catch (err) {
      showMessage({
        message: `${err.message} 😵‍💫`,
        type: 'danger',
        duration: 2000,
        icon: 'danger',
      });
    }
  };

  const handleExpandText = () => {
    setExpandText(!expandText);
  };
  return (
    <View style={styles.todoItem}>
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTxt}>{data.date}</Text>
          <Text style={styles.smallTxt}>{data.time}</Text>
        </View>
        <View style={styles.icons}>
          <BouncyCheckbox
            size={21}
            fillColor="#38CC77"
            unfillColor="#FFFFFF"
            onPress={handleTickChange}
            isChecked={completed}
          />
          <Pressable
            onPress={() =>
              Alert.alert('Delete Todo', 'Do you really wanna delete me? 🥺', [
                {
                  text: 'No',
                  onPress: () => trigger('impactMedium', options),
                },
                {text: 'Yes', onPress: () => deleteToDo(data._id)},
              ])
            }>
            <Icon name="trash-bin-outline" size={22} color="#E6425E" />
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable onPress={handleExpandText}>
          <Text
            style={[
              styles.text,
              completed && {
                textDecorationLine: 'line-through',
                color: '#1C8D73',
              },
            ]}
            numberOfLines={!expandText ? 1 : 0}>
            {data.todo}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    gap: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: commonStyles.darkText,
    fontSize: 18,
    paddingVertical: 4,
    // width: 270,
  },
  smallTxt: {
    fontSize: 13,
    color: '#758283',
  },
  icons: {
    flexDirection: 'row',
    gap: 0,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
