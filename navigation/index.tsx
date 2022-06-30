/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable, StyleSheet, View} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import CollectionsScreen from '../screens/CollectionsScreen';
import LoginModal from "../screens/LoginModal";
import SignUpScreen from '../screens/SignUpScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name={'Login'} component={LoginModal}   />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
        initialRouteName="Home"
      screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
          tabBarStyle: {
              position: 'absolute',
              bottom: 25,
              left: 20,
              right: 20,
              backgroundColor: Colors[colorScheme].backgroundTab,
              borderRadius: 20
        }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
            tabBarShowLabel: false,
            headerShown: false,
          tabBarIcon: ({ focused }) => <TabBarIcon name="home" color={Colors[colorScheme].tabIconDefault}
                                                   backgroundColor={focused? Colors[colorScheme].backgroundTabFocus : Colors[colorScheme].backgroundTab } />,
        })}
      />


        <BottomTab.Screen
        name="Collections"
        component={CollectionsScreen}
        options={{
            tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => <TabBarIcon name="search" color={Colors[colorScheme].tabIconDefault}
                                                 backgroundColor={focused? Colors[colorScheme].backgroundTabFocus : Colors[colorScheme].backgroundTab } />,
        }}
      />
        <BottomTab.Screen
            name="Profile"
            component={ProfileScreen}
            options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => <TabBarIcon name="user-circle" color={Colors[colorScheme].tabIconDefault}
                                                         backgroundColor={focused? Colors[colorScheme].backgroundTabFocus : Colors[colorScheme].backgroundTab } />,
                headerRight: () => (
                    <Pressable
                        onPress={() => navigation.navigate('Modal')}

                        style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                        })}>
                        <FontAwesome
                            name="info-circle"
                            size={15}
                            color={Colors[colorScheme].text}
                            style={{ marginRight: 15 }}
                        />
                    </Pressable>
                ),
            })}

        />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  backgroundColor: string;
}) {
    return <>
        <View {...props} style={{padding: 10, borderRadius: 20}}><FontAwesome size={20} style={{marginLeft: 20, marginRight: 20}}  {...props}/></View></>;
}
const bottomStyle = StyleSheet.create({
    main: {
        marginLeft: 30,
        marginBottom: 10,
        marginRight: 30
    }
})
