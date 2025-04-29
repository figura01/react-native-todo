import { StyleSheet } from "react-native";

const s = StyleSheet.create({
    container: {

        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
   
});

export { s };