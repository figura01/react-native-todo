import { Image } from "react-native";
import { Text, View } from "react-native";
import { s } from "./Header.style.js";
import logo from "../../assets/logo.png" 

function Header() {
  return (
    <>
        <Image style={s.img} source={logo} resizeMode="contain" />
        <Text style={s.subtitle}>
            Tu as probablement des trucs a faire
        </Text>
    </>
  );
}
export default Header;