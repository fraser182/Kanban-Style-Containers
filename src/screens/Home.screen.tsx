import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { AssemblyLine } from '../components/AssemblyLine.component';


export const HomeScreen = () => {
 

  return (
    <SafeAreaView>

      <AssemblyLine stages={["Idea", "Development", "Testing", "Deployment"]} />
    </SafeAreaView>
  );
};
