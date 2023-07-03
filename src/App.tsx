import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ILLogo } from './assets';
import { Color, FontSize } from './utils/style';
import { Gap } from './components';

const SplashScreen = () => {
  return (
    <View style={styles.page}>
      <ILLogo />
      <Gap height={20} />
      <Text style={styles.text}>My Doctor</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.WHITE
  },
  text: {
    fontSize: FontSize.H3,
    fontWeight: '600',
    fontFamily: 'Nunito'
  }
});
