import { ReactNode } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  TextInputIOSProps,
  View,
} from "react-native";

interface AuthInputProps {
  placeholder: string | undefined;
  value: string | undefined;
  onChangeText: ((text: string) => void) | undefined;
  textContentType?: TextInputIOSProps["textContentType"];
  secureTextEntry: boolean;
  label: string;
}
export const AuthInput = ({
  placeholder,
  value,
  onChangeText,
  textContentType,
  secureTextEntry,
  label,
}: AuthInputProps) => {
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
          secureTextEntry={secureTextEntry}
        />
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
    fontFamily: "Montserrat_700Bold",
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
    fontFamily: "Montserrat_600SemiBold",
  },
});
