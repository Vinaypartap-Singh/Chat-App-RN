import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ width: "100%" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Login To Continue
        </Text>
        <View style={{ marginTop: 20, gap: 20 }}>
          <TextInput
            placeholder="Email"
            style={{
              backgroundColor: theme.secondary,
              padding: 20,
              borderRadius: 10,
            }}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={{
              backgroundColor: theme.secondary,
              padding: 20,
              borderRadius: 10,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: theme.primary,

              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: theme.text,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          {/* Signup  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("Register")}>
              <Text
                style={{
                  color: theme.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
