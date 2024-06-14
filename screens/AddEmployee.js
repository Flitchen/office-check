import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  SimpleLineIcons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../context/authContext";

export default function AddEmployee() {
  const navigation = useNavigation();
  const { user, setUser, signup } = useAuth();
  const prevUser = user;
  const [selectedGender, setSelectedGender] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    gender: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const selectGender = (sex) => {
    setUserInfo({
      ...userInfo,
      gender: sex,
    });
    setSelectedGender(sex);
  };
  // console.log(userInfo);
  // console.log("selectedGender: ", selectedGender);

  const addEmployee = async () => {
    if (
      userInfo.firstName.trim() == "" ||
      userInfo.lastName.trim() == "" ||
      userInfo.phone.trim() == "" ||
      userInfo.email.trim() == "" ||
      userInfo.gender.trim() == "" ||
      userInfo.role.trim() == ""
    ) {
      Alert.alert("Error", "Please fill all the fields");

      return;
    }
    setLoading(true);

    let response = await signup(
      userInfo.email,
      userInfo.phone,
      userInfo.firstName,
      userInfo.lastName,
      userInfo.gender,
      userInfo.role.toLowerCase()
    );
    setLoading(false);

    if (!response.success) {
      Alert.alert("Error", response.msg);
      return;
    }
    Alert.alert("Success", "Employee added successfully");

    setUser(prevUser);
    setUserInfo({
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      gender: "",
      role: "",
    });
    setSelectedGender("");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 40,
          paddingBottom: 40,
        }}
      >
        <View className="relative">
          <TouchableOpacity
            className="absolute  z-50 top-5 left-4 bg-white p-2 rounded-full"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back" size={26} color="#B00000" />
          </TouchableOpacity>
          <Text className="text-center font-bold text-lightBlack text-2xl my-5 tracking-wider">
            Add Employee
          </Text>

          {/* Text Inputs */}
          <View className="space-y-3 px-6">
            <View className="space-y-2">
              <Text>First Name:</Text>
              <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg border-2 border-white  ">
                <AntDesign name="user" size={hp(3.5)} color="#1B1818" />
                <TextInput
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 font-semibold text-lightBlack"
                  placeholder="First name"
                  value={userInfo.firstName}
                  onChangeText={(text) =>
                    setUserInfo({
                      ...userInfo,
                      firstName: text,
                    })
                  }
                />
              </View>
            </View>
            <View>
              <Text>Last Name:</Text>
              <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg border-2 border-white  ">
                <AntDesign name="user" size={hp(3.5)} color="#1B1818" />
                <TextInput
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 font-semibold text-lightBlack"
                  placeholder="Last name"
                  value={userInfo.lastName}
                  onChangeText={(text) =>
                    setUserInfo({
                      ...userInfo,
                      lastName: text,
                    })
                  }
                />
              </View>
            </View>
            <View>
              <Text>Role:</Text>
              <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg border-2 border-white  ">
                <AntDesign name="user" size={hp(3.5)} color="#1B1818" />
                <TextInput
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 font-semibold text-lightBlack"
                  placeholder="Role"
                  value={userInfo.role}
                  onChangeText={(text) =>
                    setUserInfo({
                      ...userInfo,
                      role: text,
                    })
                  }
                />
              </View>
            </View>
            <View>
              <Text>Email:</Text>
              <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg border-2 border-white  ">
                <SimpleLineIcons
                  name="envelope"
                  size={hp(3.5)}
                  color="#1B1818"
                />
                <TextInput
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 font-semibold text-lightBlack"
                  placeholder="example@mail.com"
                  keyboardType="email-address"
                  value={userInfo.email}
                  onChangeText={(text) =>
                    setUserInfo({
                      ...userInfo,
                      email: text,
                    })
                  }
                />
              </View>
            </View>

            <View>
              <Text>Phone Number:</Text>
              <View className="flex-row space-x-6 px-4 py-3 items-center bg-white rounded-lg border-2 border-white  ">
                <Feather name="phone" size={hp(3.5)} color="#1B1818" />
                <TextInput
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 font-semibold text-lightBlack"
                  placeholder="0712345612"
                  keyboardType="number-pad"
                  value={userInfo.phone}
                  onChangeText={(text) =>
                    setUserInfo({
                      ...userInfo,
                      phone: text,
                    })
                  }
                />
              </View>
            </View>
            <View className="flex-row space-x-4 justify-center my-6">
              {["male", "female"].map((sex) => {
                return (
                  <TouchableOpacity
                    key={sex}
                    className={`border border-primaryRed rounded px-4 py-2 ${
                      selectedGender == sex ? "bg-primaryRed" : ""
                    }`}
                    onPress={() => selectGender(sex)}
                  >
                    <Text
                      className={`capitalize text-lg ${
                        selectedGender == sex ? "text-white" : ""
                      }`}
                    >
                      {sex}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        <View className=" mt-6 self-center flex">
          <TouchableOpacity
            disabled={loading}
            onPress={addEmployee}
            style={{ width: wp(70) }}
            className={`bg-primaryRed px-10 py-3 rounded-lg ${
              loading ? "opacity-50" : ""
            }`}
          >
            {!loading ? (
              <Text
                style={{ fontSize: hp(3) }}
                className="text-white font-bold tracking-widest text-center"
              >
                Add Employee
              </Text>
            ) : (
              <ActivityIndicator color={"white"} />
            )}
          </TouchableOpacity>
          {/* <ActivityIndicator color={"white"} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
