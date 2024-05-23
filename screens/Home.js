import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useAuth } from "../context/authContext";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
// import MapViewDirections from "react-native-maps-directions";

export default function Home() {
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();

  // console.log(new Date());
  const { logout, user } = useAuth();
  const navigation = useNavigation();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const destination = { latitude: -6.804036, longitude: 37.664695 };

  // const destination = {
  //   latitude: -6.827755,
  //   longitude: 37.6591133,
  // };

  const checkIn = async () => {
    try {
      setCheckInLoading(false);
      const docRef = doc(db, "rooms", `${date}-${month}-${year}`);
      const employeeRef = collection(docRef, "employees");
      let newDoc = await addDoc(employeeRef, {
        ...user,
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      });

      setCheckedIn(true);
      setCheckInLoading(false);
      Alert.alert("Success", "You have successfully checked in");
    } catch (error) {
      // console.log(error);
      Alert.alert("Error", "Failed to checked in");
    }
  };
  const trackDate = () => {
    date = new Date().getDate();
    month = new Date().getMonth() + 1;
    year = new Date().getFullYear();
  };
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
  const getPermissionAndCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Please grant location permission");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync();
    setLocation(currentLocation);
    setLoading(false);
    // console.log("Current Location: ", currentLocation);
  };
  useEffect(() => {
    setInterval(() => {
      getPermissionAndCurrentLocation();
    }, 60000);
  }, []);
  useEffect(() => {
    trackDate();
  }, [date, month, year]);

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <SafeAreaView className="flex-1">
        <View
          className={` flex flex-row justify-between items-center px-3 mt-2`}
        >
          <View className="rounded-full bg-neutral-300">
            <Image
              source={require("../assets/images/broNav.png")}
              style={{ height: hp(8), width: hp(8) }}
            />
          </View>
          <Text
            className={`text-primaryRed tracking-tighter text-xl font-bold`}
          >
            OFFICE CHECK
          </Text>
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
        {!loading ? (
          <MapView
            showsUserLocation
            showsMyLocationButton
            initialRegion={{
              // latitude: -6.8067067,
              // longitude: 37.702235,
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0421,
            }}
            className="my-3"
            mapType="standard"
            style={{ height: hp(80), width: wp(100) }}
          >
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              title={"Office"}
              description={"Work place"}
              pinColor={"#B00000"}
            />
          </MapView>
        ) : (
          <View className=" my-24 space-y-10 items-center">
            <Text className="text-lightBlack text-center tracking-tighter font-bold text-2xl">
              Getting your location
            </Text>
            <ActivityIndicator color={"#B00000"} size={"large"} />
          </View>
        )}
        {!loading &&
          location?.coords?.latitude === destination.latitude &&
          location?.coords?.longitude === destination.longitude && (
            <TouchableOpacity
              disabled={checkInLoading || checkedIn}
              onPress={checkIn}
              className={` rounded-lg px-4 py-2 w-32 flex self-center ${
                checkInLoading ? "opacity-50" : ""
              } ${!checkedIn ? "bg-primaryGreen" : "bg-primaryRed"}`}
            >
              <Text className="text-center text-white font-semibold text-lg">
                {!checkedIn ? "Check In" : "Checked In"}
              </Text>
            </TouchableOpacity>
          )}
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
