import { StyleSheet } from "react-native";

const s = StyleSheet.create({
    card:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height:115,
        borderRadius: 13,
        backgroundColor: "white",
        paddingHorizontal: 20,

        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    text: { fontSize: 25 },
    img:{
        height: 25,
        width: 25,
    }
});

export { s };