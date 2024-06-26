
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

type AssemblyLineProps = {
  stages: string[];
}

type ItemStateProps = {
[key: string]: string[];
}


export const AssemblyLine = ({ stages }: AssemblyLineProps) => {
  const [inputText, setInputText] = useState<string>('');
  const [items, setItems] = useState<ItemStateProps>(() => {
    const initialItems: ItemStateProps = {}
    stages.forEach((stage) => {
      initialItems[stage.toLowerCase()] = []
    })
    return initialItems
});

  const handleInputChange = (text :string) => {
    setInputText(text);
  };

  const handleAddItemPress = () => {
    if (inputText) {
      addItem(inputText.trim(), stages[0].toLowerCase());
      setInputText('');
      }
  };


  const addItem = (itemName : string, stage: string) => {
    setItems((prevItems) => {
    const updatedItems = { ...prevItems };
    const updatedStage = [itemName, ...prevItems[stage]]; // Add new item at the beginning
    updatedItems[stage] = updatedStage;
    return updatedItems;
    });
  };

  const handleClearButtonPress = () =>{
    setInputText('');
    setItems(() => {
      const initialItems: ItemStateProps = {}
    stages.forEach((stage) => {
      initialItems[stage.toLowerCase()] = []
    })
    return initialItems
    })
  }

  const deleteItem = (itemName : string, stageIndex: number) => {
    setItems((prevItems) => {
    const updatedItems = { ...prevItems };
    const stage = stages[stageIndex].toLowerCase();
    updatedItems[stage] = prevItems[stage].filter(item => item !== itemName);
    return updatedItems;
    });
  };


  const handleMoveItem = (itemName : string, stageIndex : number) => {
    const nextStageIndex = stageIndex + 1;
      if (nextStageIndex >= stages.length) {
        deleteItem(itemName, stageIndex);
      } else {
        const nextStage = stages[nextStageIndex].toLowerCase();
        addItem(itemName, nextStage);
        deleteItem(itemName, stageIndex);
    }
  };

  const moveItemBack = (itemName : string, stageIndex : number) => {
    if (stageIndex === 0) {
      deleteItem(itemName, stageIndex);
    return;
  }

    const prevStageIndex = stageIndex - 1;
    const prevStage = stages[prevStageIndex].toLowerCase();
    addItemToEnd(itemName, prevStage);
    deleteItem(itemName, stageIndex);
  };

  const addItemToEnd = (itemName: string, stage :string ) => {
    setItems((prevItems) => {
    const updatedItems = { ...prevItems };
    updatedItems[stage] = [...prevItems[stage], itemName]; // Add new item at the end
    return updatedItems;
    });
  };

  

  return (
    <ScrollView>
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
        <View key={stageIndex} testID="stage" style={styles.stageContainer}>
          <Text style={styles.stageHeader}>{stage}</Text>
          <View>
              <FlatList
                nestedScrollEnabled
                data={items[stage.toLowerCase()]}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.touchableContainer} 
                testID="item" 
                key={index}
                onLongPress={() => moveItemBack(item, stageIndex)} 
                onPress={() => handleMoveItem(item, stageIndex)}>
                <Text>{item}</Text>
                </TouchableOpacity>)}
                />
          </View> 
        </View>
      ))}
    </ScrollView>
    
  );
}




const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
     marginHorizontal: 10,
    
    
  },
  textInput: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  stageContainer: {
     marginHorizontal: 10,
    borderWidth:1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10, 
   
    minHeight: 150
  },
  stageHeader:{
    fontSize: 18,
    color: 'grey'
    
  },
  touchableContainer:{
    borderWidth: 1,
    paddingVertical: 4,
  },
 
  });
