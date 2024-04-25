import Navigation from "./navigation";
import { AuthContextProvider } from "./context/authContext";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" backgroundColor="#B00000" />
      <Navigation />
    </AuthContextProvider>
  );
}
