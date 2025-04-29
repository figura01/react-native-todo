import { useState, useEffect } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { s } from './App.style.js';
import Header from './components/Header/Header.jsx';
import { CardTodo } from './components/CardTodo/CardTodo.jsx'
import { TabBottomMenu } from './components/TabBottomMenu/TabBottomMenu.jsx';
import ButtonAdd from './components/ButtonAdd/ButtonAdd.jsx';
import Dialog from 'react-native-dialog';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

let isFirstRender = true;
let isLoadUpdate = false

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    loadTodoList();
  }, []);
  
  useEffect(() => {
    if(isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if(!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  },[todoList]);
  async function saveTodoList(){
    try {
      await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
    } catch (err) {
      alert("Error saving todo list: ", err);
    }
  }
  async function loadTodoList(){
    try {
      const stringifiedTodoList = await AsyncStorage.getItem("@todoList");
      if (stringifiedTodoList !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (err) {
      alert("Error loading todo list: ", err);
    }
  }

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    }

    const index = todoList.findIndex((t) => t.id === todo.id);

    const updatedTodoList = [...todoList];
    updatedTodoList[index] = updatedTodo;
    setTodoList(updatedTodoList);
  }

  function renderTodoList() {
    return getFiltredList().map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardTodo 
          todo={todo} 
          onUpdateTodo={updateTodo}
          onLongPress={deleteTodo}
        />
      </View>
    ));
  }

  function onPressTab(tabName) {
    console.log("Selected tab: ", tabName);
    setSelectedTabName(tabName);
  }

  function getFiltredList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "completed":
        return todoList.filter((todo) => todo.isCompleted);
      default:
        return todoList;  
    }
  }

  function deleteTodo(todo) {
    console.log("Delete todo: ", todo);
    Alert.alert(
      "Supprimer",
      "Supprimer cette tâche ?",
      [
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setTodoList(todoList.filter((t) => t.id !== todo.id));
          }
        },
        {
          text: "Annuler",
          style: "cancel"
        }
      ]
    );
  }

  function addTodo() {
    const newTodo = {
      id:uuidv4(),
      title: inputValue,
      isCompleted: false,
    }
    setTodoList([...todoList, newTodo]);
    setInputValue("");
    setIsAddDialogVisible(false);
  }

  function showAddDialog() {
    setIsAddDialogVisible(true);

  }

	return (
		<>
			<SafeAreaProvider>
				<SafeAreaView style={s.app}>
          <View>
            <Header />
          </View>
					
					<View style={s.body}>
            <ScrollView>
            { renderTodoList() }
            </ScrollView>
					</View>
          <ButtonAdd onPress={showAddDialog} />
				</SafeAreaView>
			</SafeAreaProvider>
			<View style={s.footer}>
        <TabBottomMenu 
          selectedTabName={selectedTabName}
          onPressTab={onPressTab}
          todoList={todoList}
        />
			</View>
      <Dialog.Container 
        visible={isAddDialogVisible}
        onBackdropPress={() => setIsAddDialogVisible(false)}
      >
        <Dialog.Title>Ajouter une tâche</Dialog.Title>
        <Dialog.Description>Coisir un nom pour la nouvelle tâche</Dialog.Description>
        <Dialog.Input 
          placeholder="Titre de la tâche"
          onChangeText={setInputValue}
        />

        <Dialog.Button 
          disabled={inputValue.trim().length === 0}
          label="Créer" 
          onPress={() => addTodo()} 
        />
      </Dialog.Container>
		</>
	);
}
