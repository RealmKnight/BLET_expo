import { Alert, Platform } from "react-native";

export function showAlert(title: string, message: string) {
  if (Platform.OS === "web") {
    // Use browser's alert for web
    window.alert(`${title}\n\n${message}`);
  } else {
    // Use React Native's Alert for mobile
    Alert.alert(title, message);
  }
}
