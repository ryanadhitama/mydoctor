import React from 'react';
import { View } from 'react-native';

interface IGap {
  width?: number;
  height?: number;
}

const Gap = ({ width, height }: IGap) => {
  return <View style={{ width: width, height: height }} />;
};

export default Gap;
