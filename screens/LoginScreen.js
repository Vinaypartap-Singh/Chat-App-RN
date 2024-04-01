import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unSub = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      navigation.replace("Home");
    });

    return unSub;
  }, []);

  const login = async () => {
    if (email === "" || password === "") {
      Alert.alert("Inavlid Details", "Please fill all the details properly.", [
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
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentails) => {
          const user = userCredentails?.user;
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={theme.primary} />
        </View>
      ) : (
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
            <Text
              style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
            >
              Login To Continue
            </Text>
            <View style={{ marginTop: 20, gap: 20 }}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                style={{
                  backgroundColor: theme.secondary,
                  padding: 20,
                  borderRadius: 10,
                }}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                style={{
                  backgroundColor: theme.secondary,
                  padding: 20,
                  borderRadius: 10,
                }}
              />
              <TouchableOpacity
                onPress={login}
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
                <TouchableOpacity
                  onPress={() => navigation.replace("Register")}
                >
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
      )}
    </View>
  );
}
