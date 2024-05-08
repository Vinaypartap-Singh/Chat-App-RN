import {
  Alert,
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
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

export default function RegisterScreen() {
  const navigation = useNavigation();
  // states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileURL, setProfileURL] = useState("");

  const register = async () => {
    if (
      email === "" ||
      password === "" ||
      profileURL === "" ||
      username === ""
    ) {
      Alert.alert("Invalid Details", "Please fill all the details properly.", [
        {
          text: "OK",
          style: "default",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          if (user) {
            const docRef = doc(db, "users", `${user.uid}`);
            await setDoc(docRef, {
              email: email,
              username: username,
              profileURL: profileURL,
              password: `${password} + 12098s`,
              userId: user?.uid,
              status: "online",
            });
            Alert.alert(
              "Registration Success",
              "Your account has been created",
              [
                {
                  text: "OK",
                  style: "default",
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]
            );
            navigation.replace("Login");
          }
        })
        .catch((error) => {
          Alert.alert("Error", error?.message, [
            {
              text: "OK",
              style: "default",
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
        });
    }
  };

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
              onChangeText={(text) => setUsername(text)}
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
              onChangeText={(text) => setProfileURL(text)}
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
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          {/* Regsiter Button */}
          <TouchableOpacity
            onPress={register}
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
              Register Now
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
