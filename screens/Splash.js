import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";

export default function Splash() {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigation = useNavigation();
  useEffect(() => {
    // console.log("is admin:", isAdmin);
    // console.log("is auth:", isAuthenticated);
    setTimeout(() => {
      if (
        typeof isAuthenticated == "undefined" ||
        typeof isAdmin == "undefined"
      )
        return;
      if (isAuthenticated == true) {
        if (isAdmin) {
          navigation.replace("Admin");
        } else {
          navigation.replace("Home");
        }
      } else {
        navigation.replace("Login");
      }
    }, 1000);
  }, [isAuthenticated, isAdmin]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center space-y-10">
      <View>
        <Image
          source={require("../assets/images/phoneNav.png")}
          style={{ height: hp(30), width: hp(30) }}
        />
        <Text className="text-primaryRed text-center tracking-tighter font-bold text-3xl">
          OFFICE CHECK
        </Text>
      </View>
      <ActivityIndicator color={"#B00000"} size={"large"} />
    </SafeAreaView>
  );
}
