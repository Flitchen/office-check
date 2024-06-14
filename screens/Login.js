import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";

export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (
      userCredentials.email.trim() == "" ||
      userCredentials.password.trim() == ""
    ) {
      setError("Please fill all the fields");
      setTimeout(() => {
        setError(null);
      }, 3000);
      setLoading(false);
      return;
    }

    setLoading(true);
    const response = await login(
      userCredentials.email,
      userCredentials.password
    );

    setLoading(false);
    if (!response.success) {
      setError(response.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
      Alert.alert("Error", response.msg);
      return;
    }
    if (response.role == "admin") {
      navigation.replace("Admin");
    } else {
      navigation.replace("Home");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          gap: 40,
          paddingBottom: 40,
          paddingTop: 40,
        }}
      >
        <View className="space-y-3">
          <Image
            source={require("../assets/images/phoneNav.png")}
            style={{ height: hp(20), width: wp(46) }}
          />
          <Text
            style={{ fontSize: hp(3.8) }}
            className="text-center text-primaryRed font-bold tracking-tighter"
          >
            OFFICE CHECK
          </Text>
        </View>
        <View className="space-y-6">
          <View>
            <Text
              style={{ fontSize: hp(3) }}
              className="text-center text-lightBlack font-bold tracking-widest"
            >
              Login To Your Account
            </Text>
          </View>

          {/* Text Inputs */}
          <View style={{ width: wp(80) }} className="space-y-3">
            <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg border-2 border-white  focus:border-primaryRed">
              <SimpleLineIcons name="envelope" size={hp(3.5)} color="#1B1818" />
              <TextInput
                style={{ fontSize: hp(2.5) }}
                className="flex-1 font-semibold text-lightBlack"
                placeholder="example@mail.com"
                keyboardType="email-address"
                value={userCredentials.email}
                onChangeText={(text) =>
                  setUserCredentials({
                    ...userCredentials,
                    email: text,
                  })
                }
              />
            </View>
            <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg border-2 border-white  focus:border-primaryRed">
              <Feather name="lock" size={hp(3.5)} color="#1B1818" />
              <TextInput
                style={{ fontSize: hp(2.5) }}
                className="flex-1 font-semibold text-lightBlack"
                placeholder="Password"
                secureTextEntry={showPassword ? false : true}
                value={userCredentials.password}
                onChangeText={(text) =>
                  setUserCredentials({
                    ...userCredentials,
                    password: text,
                  })
                }
              />

              {/* Show password toggle */}
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <Feather name="eye-off" size={hp(3.5)} color="black" />
                ) : (
                  <Feather name="eye" size={hp(3.5)} color="gray" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="space-y-3">
          <TouchableOpacity
            disabled={loading}
            onPress={handleLogin}
            style={{ width: wp(60) }}
            className={`bg-primaryRed px-10 py-3 rounded-lg ${
              loading ? "opacity-70" : ""
            }`}
          >
            {!loading ? (
              <Text
                style={{ fontSize: hp(3) }}
                className="text-white font-bold tracking-widest text-center"
              >
                Login
              </Text>
            ) : (
              <ActivityIndicator color={"white"} />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
