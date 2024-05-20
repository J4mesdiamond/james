// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import OnboardingScreen from './screens/onboardingscreen';
// import LoginScreen from './screens/loginscreen';
// import SignupScreen from './screens/signupscreen';
// import Home from './screens/tabScreens/home';
// import Calenda from './screens/tabScreens/calenda';
// import AddTalk from './screens/tabScreens/addTalk';
// import History from './screens/tabScreens/history';
// import Profile from './screens/tabScreens/profile';
// import Verification from './screens/tabScreens/verification';
// import ChangePassword from './screens/tabScreens/changepassword';
// import ReferFriend from './screens/tabScreens/referfriend';
// import Code from './screens/tabScreens/code';
// import EditProfile from './screens/tabScreens/editprofile';
// import ResetScreen from './screens/resetscreen';
// import Notification from './screens/notification';
// import * as Notifications from 'expo-notifications';
// import * as SplashScreen from 'expo-splash-screen';
// import { HomeIcon as HomeOutline, UserIcon as UserIconOutline, ClockIcon as ClockIconOutline } from 'react-native-heroicons/outline';
// import { HomeIcon as HomeSolid, UserIcon as UserIconSolid, PlusCircleIcon, CalendarIcon as CalendarIconSolid } from 'react-native-heroicons/solid';
// import { Platform, View } from 'react-native';

// const ios = Platform.OS === 'ios';
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const configureNotifications = async () => {
//   const { status } = await Notifications.getPermissionsAsync();
//   if (status !== 'granted') {
//     const { status: newStatus } = await Notifications.requestPermissionsAsync();
//     if (newStatus !== 'granted') {
//       alert('You need to enable notifications for this app.');
//     }
//   }
// };

// useEffect(() => {
//   configureNotifications();
// }, []);

// useEffect(() => {
//   SplashScreen.preventAutoHideAsync().then(async () => {
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2500));
//     } catch (e) {
//       console.warn(e);
//     } finally {
//       SplashScreen.hideAsync();
//     }
//   });
// }, []);

// function HomeTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarIcon: ({ focused }) => menuIcons(route, focused),
//         tabBarStyle: {
//           height: 85,
//           alignItems: 'center',
//           marginHorizontal: 1,
//           backgroundColor: '#F2F7FB',
//         },
//         tabBarItemStyle: {
//           marginTop: ios ? 10 : 0,
//         }
//       })}
//     >
//       <Tab.Screen name='home' component={HomeStackScreen} />
//       <Tab.Screen name='calenda' component={Calenda} />
//       <Tab.Screen name='addTalk' component={AddTalk} />
//       <Tab.Screen name='history' component={History} />
//       <Tab.Screen name='profile' component={ProfileStackScreen} />
//     </Tab.Navigator>
//   );
// }

// const menuIcons = (route, focused) => {
//   let icon;

//   if (route.name === 'home') {
//     icon = focused ? <HomeSolid size="30" color="#184E77" /> : <HomeOutline size="30" strokeWidth={2} color="#184E77" />;
//   } else if (route.name === 'calenda') {
//     icon = focused ? <CalendarIconSolid size="30" color="#184E77" /> : <CalendarIconSolid size="30" strokeWidth={2} color="#184E77" />;
//   } else if (route.name === 'addTalk') {
//     icon = focused ? <PlusCircleIcon size="30" color="#184E77" /> : <PlusCircleIcon size="30" strokeWidth={2} color="#184E77" />;
//   } else if (route.name === 'history') {
//     icon = focused ? <ClockIconOutline size="30" color="#184E77" /> : <ClockIconOutline size="30" strokeWidth={2} color="#184E77" />;
//   } else if (route.name === 'profile') {
//     icon = focused ? <UserIconSolid size="30" color="#184E77" /> : <UserIconOutline size="30" strokeWidth={2} color="gray" />;
//   }

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {icon}
//     </View>
//   );
// };

// const HomeStack = createNativeStackNavigator();

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//       <HomeStack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
//     </HomeStack.Navigator>
//   );
// }

// const ProfileStack = createNativeStackNavigator();

// function ProfileStackScreen() {
//   return (
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
//       <ProfileStack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
//       <ProfileStack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
//       <ProfileStack.Screen name="ReferFriend" component={ReferFriend} options={{ headerShown: false }} />
//       <ProfileStack.Screen name="Code" component={Code} options={{ headerShown: false }} />
//       <ProfileStack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
//     </ProfileStack.Navigator>
//   );
// }

// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
//         <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Homepage" component={HomeTabs} options={{ headerShown: false }} />
//         <Stack.Screen name="ResetScreen" component={ResetScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
