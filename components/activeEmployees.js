import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { dummyEmployees } from "../constants";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmptyEmployees from "./emptyEmployees";
import { AntDesign } from "@expo/vector-icons";

export default function ActiveEmployees({ activeEmployees }) {
  const ActiveEmployee = ({ item, index }) => {
    return (
      <TouchableOpacity className="rounded-xl p-2 px-3 flex-row bg-white space-x-4 items-center mx-4 mb-3">
        <View className="border border-lightGray rounded-full p-2">
          <AntDesign name="user" size={hp(4)} color="gray" />
        </View>
        <View className="flex ">
          <Text
            style={{ fontSize: hp(2) }}
            className="text-primary-text text-semibold"
          >
            Name:{" "}
            <Text className="text-lightBlack capitalize">
              {item.gender === "male" ? "Mr." : "Ms."} {item.firstName}{" "}
              {item.lastName.length > 10
                ? item.lastName.slice(0, 10) + "..."
                : item.lastName}
            </Text>
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-primary-text text-semibold"
          >
            Employee ID:{" "}
            <Text className="text-lightBlack">
              {item.uid.length > 10 ? item.uid.slice(0, 10) + "..." : item.uid}
            </Text>
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-primary-text text-semibold"
          >
            Contact: <Text className="text-lightBlack">{item.phone}</Text>
          </Text>

          <Text
            style={{ fontSize: hp(2) }}
            className="text-primary-text text-semibold"
          >
            Status: <Text className="text-primaryGreen font-bold">Active</Text>
          </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="text-primary-text text-semibold"
          >
            Time In:{" "}
            <Text className="text-lightBlack font-bold">{item.time}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={activeEmployees}
      keyExtractor={(item, index) => index}
      renderItem={({ item, index }) => (
        <ActiveEmployee item={item} index={index} />
      )}
      //   showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 15,
        paddingBottom: 25,
      }}
      ListEmptyComponent={<EmptyEmployees />}
    />
  );
}
