import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import SignupFormScreen from '../screens/SignupFormScreen';
import LevelScreen from '../screens/LevelScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupForm"
        component={SignupFormScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Level"
        component={LevelScreen}
        options={{headerShown: false, headerLeft: null, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
