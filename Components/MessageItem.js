import { Text, View } from "react-native";
import theme from "../theme";

export default function MessageItem({ data, currentUser }) {
  if (currentUser) {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: theme.text,
          margin: 10,
          alignSelf: "flex-end",
          borderRadius: 10,
        }}
      >
        <Text>{data?.text}</Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: theme.text,
          margin: 10,
          alignSelf: "flex-start",
          borderRadius: 10,
        }}
      >
        <Text>{data?.text}</Text>
      </View>
    );
  }
}
