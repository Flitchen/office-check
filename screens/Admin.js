import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  SimpleLineIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import ActiveEmployees from "../components/activeEmployees";

export default function Admin() {
  let date;
  let month;
  let year;

  const { logout } = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [activeEmployees, setActiveEmployees] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };
  const handleMorePress = () => {
    setShowMoreOptions(true);
  };
  const handleTouchablePress = () => {
    setShowMoreOptions(false);
  };
  useEffect(() => {
    let todayDate = new Date().getDate();
    date = todayDate;
    let todayMonth = new Date().getMonth() + 1;
    month = todayMonth;
    let todayYear = new Date().getFullYear();
    year = todayYear;

    let roomId = `${date}-${month}-${year}`;

    const docRef = doc(db, "rooms", roomId);
    const employeeRef = collection(docRef, "employees");

    const q = query(employeeRef, orderBy("time", "asc"));

    let unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedEmployees = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setActiveEmployees([...fetchedEmployees]);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <SafeAreaView className="flex-1">
        <View
          className={` flex flex-row justify-between items-center px-3 my-1`}
        >
          <Image
            source={require("../assets/images/phoneNav.png")}
            style={{ height: hp(8), width: hp(8) }}
          />
          <View className="flex items-center">
            <Text
              className={`text-primaryRed tracking-tighter text-xl font-bold`}
            >
              OFFICE CHECK
            </Text>
            <Text className={`text-lightBlack tracking-tighter font-semibold`}>
              Admin Panel
            </Text>
          </View>
          <TouchableOpacity onPress={handleMorePress}>
            <Feather name="more-vertical" size={24} color="black" />
          </TouchableOpacity>
          {showMoreOptions && (
            <MoreOptions
              navigation={navigation}
              handleTouchablePress={handleTouchablePress}
              handleLogout={handleLogout}
              showMoreOptions={showMoreOptions}
            />
          )}
        </View>
        {loading ? (
          <View className=" my-24 space-y-10 items-center">
            <Text className="text-lightBlack text-center tracking-tighter font-bold text-2xl">
              Getting employees arrived at the office
            </Text>
            <ActivityIndicator color={"#B00000"} size={"large"} />
          </View>
        ) : (
          <ActiveEmployees activeEmployees={activeEmployees} />
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("AddEmployee")}
          className="p-3 absolute bottom-10 right-5 z-50 rounded-full bg-primaryRed"
        >
          <AntDesign name="plus" size={hp(3)} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const MoreOptions = ({
  navigation,
  handleTouchablePress,
  handleLogout,
  showMoreOptions,
}) => {
  return (
    <Modal transparent visible={showMoreOptions}>
      <View className="absolute top-5 right-2 z-50 mt-6 mr-2 bg-white rounded-lg p-4 space-y-3">
        <TouchableOpacity
          className=" flex-row space-x-5 items-center"
          onPress={() => {
            navigation.navigate("AllUsers");
            handleTouchablePress();
          }}
        >
          <Feather name="users" size={hp(2.71)} color="gray" />
          <Text className="text-neutral-600 mr-1" style={{ fontSize: hp(2) }}>
            Employees
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=" flex-row space-x-5 items-center"
          onPress={() => {
            navigation.navigate("PasswordChange");
            handleTouchablePress();
          }}
        >
          <MaterialIcons name="password" size={hp(2.71)} color="gray" />
          <Text className="text-neutral-600 mr-1" style={{ fontSize: hp(2) }}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          className=" flex-row space-x-5 items-center"
        >
          <SimpleLineIcons name="logout" size={hp(2.71)} color="gray" />
          <Text className="text-neutral-600 mr-1" style={{ fontSize: hp(2) }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View onTouchEnd={handleTouchablePress} className="flex-1"></View>
    </Modal>
  );
};
