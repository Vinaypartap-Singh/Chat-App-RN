import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Navigaion from "./Navigation";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Navigaion />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
