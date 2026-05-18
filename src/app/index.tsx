import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useForm, Controller } from "react-hook-form";

const Index = () => {
  const [count, setCount] = useState(0);

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={{ alignItems: "center", gap: 10 }}>
      <Text style={styles.title}>Welcome</Text>

      <Text>Count: {count}</Text>

      <Pressable onPress={() => setCount(count + 1)} style={styles.button}>
        <Text style={{ color: "white", textAlign: "center" }}>Count</Text>
      </Pressable>

      <View style={{ gap: 10 }}>
        <Text>Login Form</Text>

        <View>
          <Text>Email *</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter your name"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
        </View>
        <View>
          <Text>Number</Text>
          <Controller
            control={control}
            name="number"
            render={({ field: { onChange, value } }) => (
              <TextInput
                keyboardType="numeric"
                placeholder="Enter your number"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
        </View>

        <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text style={{ color: "white", textAlign: "center" }}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
  },

  button: {
    backgroundColor: "red",
    width: 100,
    padding: 10,
    borderRadius: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    width: 250,
  },
});

export default Index;
