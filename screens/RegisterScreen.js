import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../theme";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhotoIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
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
          Create an Account
        </Text>
        <View style={{ marginTop: 20, gap: 20 }}>
          {/* username */}
          <View
            style={{
              backgroundColor: theme.secondary,
              padding: 20,
              borderRadius: 10,
              flexDirection: "row",
              paddingHorizontal: 10,
              alignItems: "center",
              gap: 10,
            }}
          >
            <UserIcon size={25} color={theme.iconColor} />
            <TextInput
              placeholder="Usernames"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {/* Email */}
          <View
            style={{
              backgroundColor: theme.secondary,
              padding: 20,
              borderRadius: 10,
              flexDirection: "row",
              paddingHorizontal: 10,
              alignItems: "center",
              gap: 10,
            }}
          >
            <EnvelopeIcon size={25} color={theme.iconColor} />
            <TextInput
              placeholder="Email Address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          {/* Profile URL */}
          <View
            style={{
              backgroundColor: theme.secondary,
              padding: 20,
              borderRadius: 10,
              flexDirection: "row",
              paddingHorizontal: 10,
              alignItems: "center",
              gap: 10,
            }}
          >
            <PhotoIcon size={25} color={theme.iconColor} />
            <TextInput
              placeholder="Profile URL"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {/* Password */}
          <View
            style={{
              backgroundColor: theme.secondary,
              padding: 20,
              borderRadius: 10,
              flexDirection: "row",
              paddingHorizontal: 10,
              alignItems: "center",
              gap: 10,
            }}
          >
            <LockClosedIcon size={25} color={theme.iconColor} />
            <TextInput
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
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
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text
                style={{
                  color: theme.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Login now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
