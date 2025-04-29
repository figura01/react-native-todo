import {Text, Image, TouchableOpacity } from "react-native";
import checkImg from "../../assets/check.png";
import { s } from "./CardTodo.style.js";

export function CardTodo({ todo, onUpdateTodo, onLongPress }) {
    return (
        <>
            <TouchableOpacity 
                style={s.card}
                onPress={() => onUpdateTodo(todo)}
                onLongPress={() => onLongPress(todo)}
            >
                <Text style={[s.text, todo.isCompleted && { textDecorationLine: "line-through"} ]}>{todo.title}</Text>
                { todo.isCompleted && <Image style={s.img} source={checkImg}/> }
            </TouchableOpacity>
        </>
    );
}