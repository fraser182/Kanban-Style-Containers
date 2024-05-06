
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

type AssemblyLineProps = {
  stages: string[];
}

export const AssemblyLine = ({ stages }: AssemblyLineProps) => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState({});

  const handleInputChange = (text :string) => {
    setInputText(text);
  };

  const handleButtonPress = () => {
    if (inputText.trim() !== '') {
      setItems((prevItems) => ({
        ...prevItems,
        idea: [inputText.trim(), ...(prevItems.idea || [])],
      }));
      setInputText('');
    }
  };

  const handleClearPress = () =>{
    setInputText('');
    setItems([])

  }

  console.log('items', items)

  return (
    <View>
    <View style={styles.container}>

      <TextInput
      style={styles.textInput}
        value={inputText}
        onChangeText={handleInputChange}
        placeholder="Enter item"
        />
      <Button
        title="Add Item"
        onPress={handleButtonPress}
        />

 <Button
        title="Clear"
        onPress={handleClearPress}
        />
        </View>
    
      {stages.map((stage : string, index : number) => (
        <View key={index} style={styles.stage}>
          <Text>{stage}</Text>
          <View >
            {/* Render items for each stage */}
            {items[stage.toLowerCase()] &&
              items[stage.toLowerCase()].map((item : string, itemIndex :number) => (
                <TouchableOpacity key={itemIndex} onPress={() => null}>
                <Text >{item}</Text>
                </TouchableOpacity>
              ))}
          </View>
          {/* Text input and button */}
          
        </View>
      ))}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flexWrap:'wrap',
    // justifyContent: 'space-around',
    marginTop: 20,
    
  },
  textInput: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 8,
    paddingLeft: 8,
  }
  });
