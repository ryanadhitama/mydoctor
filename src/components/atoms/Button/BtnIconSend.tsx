import { IconSendDark, IconSendLight } from '@assets';
import { colors } from '@utils';
import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

const BtnIconSend = ({ disable, onPress }: any) => {
  if (disable) {
    return (
      <View style={ContainerStyles(disable)}>
        <IconSendDark />
      </View>
    );
  }
  return (
    <TouchableOpacity style={ContainerStyles(disable)} onPress={onPress}>
      <IconSendLight />
    </TouchableOpacity>
  );
};

export default BtnIconSend;

const ContainerStyles = (disable: boolean): ViewStyle => ({
  backgroundColor: disable ? colors.disable : colors.tertiary,
  width: 45,
  height: 45,
  borderRadius: 10,
  paddingTop: 3,
  paddingRight: 3,
  paddingBottom: 8,
  paddingLeft: 8
});