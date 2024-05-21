import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const generateRandomNumber = () => {
    const min = 1;
    const max = 100;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomNum);
    setFeedback(""); 
    setUserGuess("");
  };

  const handleGuess = () => {
    const guess = parseInt(userGuess);
    if (isNaN(guess)) {
      Alert.alert("Invalid input", "Please enter a valid number");
      return;
    }

    if (guess < randomNumber) {
      setFeedback("Too low!");
      setUserGuess("");
    } else if (guess > randomNumber) {
      setFeedback("Too high!");
      setUserGuess("");
    } else {
      setFeedback("Correct! Starting a new game...");
     setTimeout(() => {
       generateRandomNumber();
     }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Guess a number between 1 and 100!</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={userGuess}
        onChangeText={setUserGuess}
      />
      <View style={styles.buttonContainer}>
        <Button title="Go" color="white" onPress={handleGuess} />
      </View>
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 200,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "black",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 10,
  },
  feedback: {
    fontSize: 18,
    marginTop: 10,
  },
});
