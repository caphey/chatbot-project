import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";

const App = () => {
  // Déclaration des états de l'application
  const [message, setMessage] = useState(""); // Message actuellement saisi par l'utilisateur
  const [chat, setChat] = useState([]); // Historique de la conversation

  const sendMessage = async () => {
    console.log("sendMessage", message);
    if (message.trim()) {
      // Vérifie si le message n'est pas vide
      try {
        // Envoi du message à l'API du chatbot
        const { data } = await axios.post("http://127.0.0.1:5000/ask", {
          question: message,
        });
        // Ajout du message de l'utilisateur et de la réponse du bot à l'historique de la conversation
        setChat([
          ...chat,
          { message, from: "user" },
          {
            message: data, // La réponse du bot
            from: "bot",
          },
        ]);
        setMessage(""); // Réinitialisation du message saisi par l'utilisateur
      } catch (error) {
        console.error(error);
        alert("Erreur lors de l'envoi du message"); // Affichage d'une alerte en cas d'erreur lors de l'envoi du message
      }
    }
  };

  return (
    // Composant pour éviter que le clavier n'obstrue les éléments de l'interface
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.title}>Eri ChatBot Beta Test</Text>
      </View>
      <ScrollView style={styles.chat}>
        {chat.map((msg, index) => (
          // Affichage de chaque message de l'historique de la conversation
          <View
            key={index}
            style={msg.from === "user" ? styles.userMsg : styles.botMsg} // Style différent selon l'expéditeur du message
          >
            <Text style={msg.from === "bot" ? { color: "#61dafb" } : null}>
              {msg.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage} // Mise à jour du message saisi par l'utilisateur
          placeholder="Envoyer un message"
          onSubmitEditing={sendMessage} // Envoi du message lorsque l'utilisateur appuie sur la touche "Envoyer"
          returnKeyType="send" // Change la touche "Entrée" en touche "Envoyer" sur les claviers mobiles virtuels
          blurOnSubmit={false} // Garde le clavier ouvert après l'envoi du message
        />
        <Button title="Envoyer" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#282c34",
  },
  title: {
    fontSize: 20,
    color: "#fff",
  },
  chat: {
    flex: 1,
    padding: 20,
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#61dafb",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#282c34",
    borderColor: "#61dafb",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#282c34",
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
});

export default App;
