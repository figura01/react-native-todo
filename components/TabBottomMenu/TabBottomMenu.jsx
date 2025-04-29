import { View, Text, TouchableOpacity } from "react-native";
import { s } from "./TabBottomMenu.style.js";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";
export function TabBottomMenu({ selectedTabName, onPressTab, todoList }) {
    const countByStatus = todoList.reduce(
        (acc, todo) => {
            todo.isCompleted ? acc.done++ : acc.inProgress++;
            return acc;
        },
        { all: todoList.length, done: 0, inProgress: 0 }    
    )
    
    function getTextStyle(tabName) {
        return {fontWeight: "bold",
            color: tabName === selectedTabName ? "#2f76E5" : "black",
          
        }
    }



    return (
       <View style={s.container}>
            <TouchableOpacity
                onPress={() => onPressTab("all")}
                
            >   
                <Text
                    style={getTextStyle(("all"))}
                >
                    All ({countByStatus.all})
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPressTab("inProgress")}

            >
                <Text
                    style={getTextStyle("inProgress")}
                >In progress ({countByStatus.inProgress})</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onPressTab("completed")}
            >
                <Text
                    style={getTextStyle("completed")}
                >Completed ({countByStatus.done})</Text>
            </TouchableOpacity>
       </View>
    )
}