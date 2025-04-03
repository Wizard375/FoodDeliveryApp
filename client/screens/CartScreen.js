import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { featured } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/RestaurantSlice";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../slices/CartSlice";
import { urlFor } from "../sanity";

export default function CartScreen() {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupeditems] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item._id]) {
        group[item._id].push(item);
      } else {
        group[item._id] = [item];
      }
      return group;
    }, {});
    setGroupeditems(items);
  }, [cartItems]);
  return (
    <Modal transparent={true} animationType="slide">
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "97%",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            shadowColor: "black",
            elevation: 5,
          }}
          className="relative pt-4 shadow-sm"
        >
          {/* {Back Button} */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: ThemeColors.bgColor(1) }}
            className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={"white"} />
          </TouchableOpacity>

          {/* {Heading} */}
          <Text className="text-center font-bold text-xl">Your Cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>

          {/* {delivery time} */}
          <View
            style={{ backgroundColor: ThemeColors.bgColor(0.2) }}
            className="flex-row mt-3 px-4 items-center"
          >
            <Image
              source={require("../assets/images/bikeGuy.png")}
              className="w-20 h-20"
            />
            <Text className="font-medium flex-1 pl-4">
              Deliver in 10-20 minutes
            </Text>
            <TouchableOpacity>
              <Text className="font-bold" style={{ color: ThemeColors.text }}>
                Change
              </Text>
            </TouchableOpacity>
          </View>

          {/* {dishes} */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 50,
            }}
            className="bg-white pt-5"
          >
            {Object.entries(groupedItems).map(([key, items]) => {
              let dish = items[0];
              return (
                <View
                  style={{ shadowColor: "black" }}
                  key={key}
                  className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
                >
                  <Text
                    className="font-bold"
                    style={{ color: ThemeColors.text }}
                  >
                    {items.length} x
                  </Text>
                  <Image
                    className="h-14 w-14 rounded-full"
                    source={{ uri: urlFor(dish.image).url() }}
                  />
                  <Text className="flex-1 font-bold text-gray-700">
                    {dish.name}
                  </Text>
                  <Text className="font-semibold text-base">${dish.price}</Text>
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart({ id: dish._id }))}
                    className="p-1 rounded-full"
                    style={{ backgroundColor: ThemeColors.bgColor(1) }}
                  >
                    <Icon.Minus
                      strokeWidth={4}
                      height={20}
                      width={20}
                      stroke={"white"}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          {/* {totals} */}
          <View
            style={{ backgroundColor: ThemeColors.bgColor(0.2) }}
            className="p-6 px-8 rounded-t-3xl space-y-4"
          >
            <View className="flex-row justify-between">
              <Text className="text-gray-700 font-medium text-base">
                Subtotal
              </Text>
              <Text className="text-gray-700 font-medium text-base">
                ${cartTotal}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-700 font-medium text-base">
                Delivery Fee
              </Text>
              <Text className="text-gray-700 font-medium text-base">$2</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-700 font-extrabold text-base">
                Order Total
              </Text>
              <Text className="text-gray-700 font-extrabold text-base">
                ${cartTotal + 2}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("OrderPreparingScreen")}
              style={{ backgroundColor: ThemeColors.bgColor(1) }}
              className="p-3 rounded-full -mb-2"
            >
              <Text className="text-white text-center font-bold text-lg">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
