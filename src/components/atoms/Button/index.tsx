import { colors, fonts } from '@utils';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import BtnIconSend from './BtnIconSend';
import IconOnly from './IconOnly';

type ButtonProps = {
  title?: string;
  type?: string;
  icon?: any;
  onPress: () => void;
  disable?: boolean;
};

const Button = ({ type, title, onPress, icon, disable }: ButtonProps) => {
  if (type === 'btn-icon-send') {
    return <BtnIconSend disable={disable} onPress={onPress} />;
  }
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }
  if (disable) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={ContainerStyles(type as string)} onPress={onPress}>
      <Text style={TextStyles(type as string)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const ContainerStyles = (type: string): ViewStyle => ({
  backgroundColor:
    type === 'secondary' ? colors.button.secondary.background : colors.button.primary.background,
  paddingVertical: 10,
  borderRadius: 10
});

const TextStyles = (type: string): TextStyle => ({
  fontSize: 18,
  fontFamily: fonts.primary[600],
  textAlign: 'center',
  color: type === 'secondary' ? colors.button.secondary.text : colors.button.primary.text
});

const styles = StyleSheet.create({
  disableBg: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.button.disable.background
  },
  disableText: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color: colors.button.disable.text
  }
});
