import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { AssemblyLine } from '../components/AssemblyLine.component';

// import { AssemblyLine } from '../components/AssemblyLine.component';

export const HomeScreen = () => {
  // const [inputText, setInputText] = useState('');
  // const [items, setItems] = useState({ idea: [], development: [], testing: [], deployment: [] });

  // const handleInputChange = (text) => {
  //   setInputText(text);
  // };

  // const handleButtonPress = () => {
  //   const stage = 'idea'; // Default to 'idea' for now
  //   setItems((prevItems) => ({ ...prevItems, [stage]: [...prevItems[stage], inputText] }));
  //   setInputText('');
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={inputText}
        placeholder="Enter item"
      />
      <Button title="Add Item" onPress={() => handleButtonPress} /> */}
      <AssemblyLine stages={["Idea", "Development", "Testing", "Deployment"]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 20,
  },
});