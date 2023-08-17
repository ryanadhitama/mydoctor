import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  GetStarted,
  Register,
  Login,
  UploadPhoto,
  Doctor,
  Hospitals,
  UserProfile,
  UpdateProfile,
  DoctorProfile,
  Chatting,
  Messages,
  ChooseDoctor
} from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '@components';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Splash: undefined;
  GetStarted: undefined;
  Register: undefined;
  Login: undefined;
  UploadPhoto: undefined;
  MainApp: undefined;
  UserProfile: undefined;
  UpdateProfile: undefined;
  DoctorProfile: undefined;
  Chatting: undefined;
  ChooseDoctor: undefined;
};

export type RootTabParamList = {
  Doctor: undefined;
  Messages: undefined;
  Hospitals: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const MainApp = () => {
  return (
    // eslint-disable-next-line react/no-unstable-nested-components
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Doctor" component={Doctor} options={{ headerShown: false }} />
      <Tab.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
      <Tab.Screen name="Hospitals" component={Hospitals} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Chatting" component={Chatting} options={{ headerShown: false }} />
      <Stack.Screen name="ChooseDoctor" component={ChooseDoctor} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Router;
