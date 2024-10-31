import React, { useState, useEffect } from 'react';
import { router } from "expo-router";
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';


export default function CrearQuiz() {
      

    return (
        <ScrollView >
            <View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
                  <Text>Quiz Creado con éxito</Text>
                  <TouchableOpacity 
                        onPress={() => router.back()} >
                        <Text>Finalizar</Text>
                  </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    statusBarLightPosition: {
          width: 393,
          left: 0,
          position: "absolute"
    }
});
