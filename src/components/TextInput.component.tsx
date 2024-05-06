import { FC, useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type TextInputComponentProps = {
    setInputText: React.Dispatch<React.SetStateAction<string>>
    inputText: string
}

export const TextInputComponent: FC <TextInputComponentProps> = ({inputText,setInputText }) => {
   
return (
 <View style={styles.container}>
    <TextInput
    testID="new-item"
    style={styles.input}
    value={inputText}
    onChangeText={setInputText}
    autoCorrect={false}
    autoCapitalize="none"  
  />  
</View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        flex:1,
        justifyContent: 'center'
    },
    input: {
        fontSize: 16,
    }
})