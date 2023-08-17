import { DummyHospital1, DummyHospital2, DummyHospital3, ILHospitalBG } from '@assets';
import { ListHospital } from '@components';
import { colors, fonts } from '@utils';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Hospitals = () => {
  const items = [
    {
      type: 'Rumah Sakit',
      name: 'Citra Bunga Merdeka',
      address: 'Jln. Surya Sejahtera 20',
      image: DummyHospital1
    },
    {
      type: 'Rumah Sakit Anak',
      name: 'Happy Family Kids',
      address: 'Jln. Surya Sejahtera 20',
      image: DummyHospital2
    },
    {
      type: 'Rumah Sakit Jiwa',
      name: 'Tingkatan Paling Atas',
      address: 'Jln. Surya Sejahtera 20',
      image: DummyHospital3
    }
  ];
  return (
    <SafeAreaView style={styles.page} edges={['top']}>
      <ImageBackground source={ILHospitalBG} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        {items?.map((item: any, i: number) => (
          <ListHospital
            type={item?.type}
            name={item?.name}
            address={item?.address}
            pic={item?.image}
            key={`lh-${i}`}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.white },
  background: { height: 240, paddingTop: 30 },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center'
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center'
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14
  }
});
