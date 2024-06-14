import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmployeeList from "../components/employeeList";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function AllUsers() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "employees"), where("role", "!=", "admin"));

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedEmployees = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setEmployees([...fetchedEmployees]);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  return (
    <SafeAreaView className="flex-1">
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
          All Employees
        </Text>
      </View>
      {loading ? (
        <View className=" my-24 space-y-10 items-center">
          <Text className="text-lightBlack text-center tracking-tighter font-bold text-2xl">
            Getting employee list
          </Text>
          <ActivityIndicator color={"#B00000"} size={"large"} />
        </View>
      ) : employees.length > 0 ? (
        <EmployeeList employees={employees} />
      ) : (
        <Text
          style={{ fontSize: hp(3) }}
          className="text-center text-primary-text font-bold tracking-widest"
        >
          No employees available
        </Text>
      )}
    </SafeAreaView>
  );
}
