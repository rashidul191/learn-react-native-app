import { Stack, useLocalSearchParams } from "expo-router";
import { Text, StyleSheet, View } from "react-native";

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "My Custom Post" }}  />
      <Text>{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
