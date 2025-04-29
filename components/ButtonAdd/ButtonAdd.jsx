import { TouchableOpacity, Text } from 'react-native';
import { s } from "./ButtonAdd.style.js";

export default function ButtonAdd({ onPress }) {
  return (
    <TouchableOpacity
      title="Ajouter une tâche"
      onPress={onPress}
      color="#841584"
      style={s.btn}
    >
        <Text style={s.txt}>
            + New todo
        </Text>
    </TouchableOpacity>
  );
}