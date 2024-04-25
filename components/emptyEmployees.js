import { View, Text, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function EmptyEmployees() {
  return (
    <View className="flex-1 justify-between items-center">
      <Text
        style={{ fontSize: hp(3) }}
        className="text-center text-primary-text font-bold tracking-widest"
      >
        No employees available
      </Text>
    </View>
  );
}
