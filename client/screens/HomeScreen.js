import { ScrollView, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { ThemeColors } from "../theme";
import Categories from "../components/Categories";
import { featured } from "../constants";
import FeaturedRow from "../components/featuredRow";
import { getFeaturedRestaurants } from "../api";

const HomeScreen = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);

  useEffect(() => {
    getFeaturedRestaurants().then((data) => {
      setFeaturedRestaurants(data);
    });
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle="dark-content" />

      {/* {Search Bar} */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 mt-6">
        <View className="flex-row flex-1 items-center p-1.5 rounded-full border-2 border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Restaurants" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="grey" />
            <Text className="text-gray-600 mr-1">New York, USA</Text>
          </View>
        </View>

        <View
          style={{ backgroundColor: ThemeColors.bgColor(1) }}
          className="p-2 rounded-full"
        >
          <Icon.Sliders
            height={25}
            width={25}
            stroke={"white"}
            strokeWidth={2.5}
          />
        </View>
      </View>

      {/* {main} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {/* {categories} */}
        <Categories />

        <View className="mt-5">
          {featuredRestaurants.map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.name}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
