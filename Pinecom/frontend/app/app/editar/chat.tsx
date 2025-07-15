import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Message from "../Components/message";
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getIP from "../ip";

export default function Index() {
    const [messages, setMessages] = useState([{
			message: "",
			sender: "user"
	}])
    const getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            alert("Erro ao recuperar dados:");
            return "error";
        };
    };
    const [token_backup, setToken_backup] = useState("");
    const [product_id_backup, setProduct_id_backup] = useState(0);
    const [text, setText] = useState("");
    const scrollViewRef = useRef(null);

    const ip = getIP();

    const styles = StyleSheet.create({
        main: {
            flex: 1,
            padding: 20,
            alignItems: "flex-start",
            backgroundColor: "black"
        },
        messages: {
            width: "100%",
            height: "80%",
            marginTop: "10%"
        },
        textControl: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10
        },
        textInput: {
            backgroundColor: "rgb(26, 26, 26)",
            fontSize: 15,
            padding: 10,
            color: "#989898",
            width: "81%",
            borderRadius: 10
        },
        send: {
            backgroundColor: "rgb(26, 26, 26)",
            fontSize: 20,
            padding: 10,
            color: "#989898",
            width: "14%",
            borderRadius: 20,
        },
        header: {
            marginTop: 10,
          },
          
    })
    
    const get_chat = async () => {
        const token = await getData("token");
        const product_id_async = await getData("product_id");
        const product_id = Number(product_id_async);
        const response = await axios.post('http://'+ip+':5000/get-chat', {
            token: token,
            product_id: product_id
        }, {
            timeout: 20000,
        });
        setMessages(response.data.messages);
        scrollViewRef.current?.scrollToEnd({ animated: true });
        setToken_backup(token);
        setProduct_id_backup(product_id);
    }

    const sendMessage = async () => {
        let local_messages = messages;
        local_messages.push({
			message: text,
			sender: "user"
		});
        setMessages(local_messages);
        const token = token_backup;
        const product_id = product_id_backup;
        alert(token_backup);
        alert(product_id_backup);
        setText("");
        scrollViewRef.current?.scrollToEnd({ animated: true });
        const response = await axios.post('http://'+ip+':5000/send-message', {
            token: token,
            product_id: product_id,
            message: text
        });
        get_chat();
    }
    useEffect(() => {
        get_chat();
    }, [])

    return (
        <View
            style={styles.main}
        >

<View style={styles.header}>        
  <TouchableOpacity onPress={() => router.back()}>
    <Ionicons name="arrow-back" size={24} color="#fff" />
  </TouchableOpacity>
</View>
            <ScrollView ref={scrollViewRef} style={styles.messages}>
                {messages.map((message: any, index: any) => {
                    return (<Message key={index} who={message.sender} content={message.message}/>)
                })}
            </ScrollView>
            <View style={styles.textControl}>
                <TextInput
                    placeholder="Escreva a sua mensagem"
                    multiline={true}
                    numberOfLines={1}
                    value={text}
                    onChange={(event) => setText(event.nativeEvent.text)}
                    style={styles.textInput}
                    onSubmitEditing={() => sendMessage()}
                    placeholderTextColor={"#989898"}
                />
                <TouchableOpacity style={styles.send} onPress={() => sendMessage()}>
                    <Ionicons name="send" size={28} color="#989898" />
                </TouchableOpacity>
            </View>
        </View>
    );
}