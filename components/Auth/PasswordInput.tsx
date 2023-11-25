import {
  StyleSheet,
  TextInput,
  Text,
  TextInputIOSProps,
  View,
  Pressable,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface PasswordInputProps {
  placeholder: string | undefined;
  value: string | undefined;
  onChangeText: ((text: string) => void) | undefined;
  textContentType?: TextInputIOSProps["textContentType"];
  label: string;
}
export const PasswordInput = ({
  placeholder,
  value,
  onChangeText,
  textContentType,
  label,
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 10,
        }}
      >
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
          placeholderTextColor="#fff"
          underlineColorAndroid="transparent"
          textContentType={textContentType}
          secureTextEntry={!isVisible}
        />
        <Pressable
          onPress={() => {
            setIsVisible(!isVisible);
          }}
        >
          {isVisible ? (
            <Ionicons
              name="eye"
              size={24}
              color="white"
              style={{ fontSize: 16 }}
            />
          ) : (
            <Ionicons
              name="eye-off"
              size={24}
              color="white"
              style={{ fontSize: 16 }}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    gap: 15,
    flexDirection: "column",
  },
  label: {
    fontSize: 16,
    color: "white",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 40,
    width: "100%",
    borderWidth: 2,
    paddingHorizontal: 20,
    borderColor: "white",
    height: 60,
    gap: 10,
    flexDirection: "row",
  },
  input: {
    fontSize: 14,
    flex: 1,
    color: "white",
  },
});
