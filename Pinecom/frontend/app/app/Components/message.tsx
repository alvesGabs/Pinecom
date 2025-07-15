import { Text, View, StyleSheet } from "react-native";

export default function Message(props: {who: 'user' | 'assistant', content: String}) {
    const settings = {
        colors: {
            "user": {
                text: "rgb(255, 255, 255)",
                background: "#353535"
            },
            "assistant": {
                text: "rgb(200, 200, 200)",
                background: "#1A1A1A"
            }
        },
        container_align_items: {
            "user": "flex-end",
            "assistant": "flex-start"
        }
    }
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            alignItems: props.who == "user" ? "flex-end" : "flex-start",
            marginBottom: 5
        },
        message: {
            maxWidth: "100%",
            backgroundColor: settings.colors[props.who].background,
            borderRadius: 20,
            borderTopStartRadius: props.who == "assistant" ? 0 : 20,
            borderTopEndRadius: props.who == "user" ? 0 : 20,
            marginBottom: 20,
            padding: 15,
        },
        text:{
            color: settings.colors[props.who].text,
            fontSize: 15,
            lineHeight: 20,
            textAlign: "justify"
        }
    });
    return (
        <View style={styles.container}>
            <View style={styles.message}>
                <Text style={styles.text}>{props.content}</Text>
            </View>
        </View>
    );
    }
