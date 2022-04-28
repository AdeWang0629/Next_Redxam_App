import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Router = () => {
  const token = useSelector(state => state.user.token);
  return (
    <NavigationContainer>
      {token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
