
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

type AssemblyLineProps = {
  stages: string[];
}

type ItemStateProps = {
[key: string]: string[];
}


export const AssemblyLine = ({ stages }: AssemblyLineProps) => {
  const [inputText, setInputText] = useState<string>('');
  const [items, setItems] = useState<ItemStateProps>({
idea: [],
development: [],
testing: [],   
deployment: [],
});



  const handleInputChange = (text :string) => {
    setInputText(text);
  };

  const handleAddItemPress = () => {
if (inputText.trim() !== '') {
addItem(inputText.trim(), stages[0].toLowerCase());
setInputText('');
}
};


const addItem = (itemName, stage) => {
setItems((prevItems) => {
const updatedItems = { ...prevItems };
const updatedStage = [itemName, ...prevItems[stage]]; // Add new item at the beginning
updatedItems[stage] = updatedStage;
return updatedItems;
});
};





  const handleClearButtonPress = () =>{
    setInputText('');
    setItems({
    idea: [],
    development: [],
    testing: [],
    deployment: [],
    })
  }

  const deleteItem = (itemName, stageIndex) => {
    setItems((prevItems) => {
    const updatedItems = { ...prevItems };
    const stage = stages[stageIndex].toLowerCase();
    updatedItems[stage] = prevItems[stage].filter(item => item !== itemName);
    return updatedItems;
    });
  };


  const handleMoveItem = (itemName, stageIndex) => {
    const nextStageIndex = stageIndex + 1;
      if (nextStageIndex >= stages.length) {
        deleteItem(itemName, stageIndex);
      } else {
        const nextStage = stages[nextStageIndex].toLowerCase();
        addItem(itemName, nextStage);
        deleteItem(itemName, stageIndex);
    }
  };

  console.log('items', items)

  return (
    <View>
    <View style={styles.container}>

      <TextInput
        testID="new-item"
        style={styles.textInput}
        value={inputText}
        onChangeText={handleInputChange}
        placeholder="Enter item"
        />
      <Button
        testID="add-new-item"
        title="Add Item"
        onPress={handleAddItemPress}
        />

      <Button
        title="Clear"
        onPress={handleClearButtonPress}
        />

    </View>
     {/* Render each stage */}
      {stages.map((stage : string, stageIndex : number) => (
        <View key={stageIndex} testID="stage">
          <Text>{stage}</Text>
          <View >
            {/* Render items for each stage */}
            {items[stage.toLowerCase()] &&
              items[stage.toLowerCase()].map((item : string, itemIndex :number) => (
                <TouchableOpacity testID="item" key={itemIndex} onPress={() => handleMoveItem(item, stageIndex)}>
                <Text >{item}</Text>
                </TouchableOpacity>
              ))}
          </View> 
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
