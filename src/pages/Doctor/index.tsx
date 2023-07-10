/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DoctorCategory, Gap, HomeProfile, NewsItem, RatedDoctor } from '../../components';
// import { Fire } from '../../config';
import { colors, fonts } from '../../utils';
import {
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
  DummyNews1,
  DummyNews2,
  DummyNews3,
  ILNullPhoto
} from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';

const Doctor = ({ navigation }: any) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: ''
  });

  return (
    <SafeAreaView style={styles.page} edges={['top']}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            {/* <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile', profile)}
            /> */}
            <HomeProfile
              profile={{
                fullName: 'Shayna Melinda',
                profession: 'Product Designer',
                photo: DummyDoctor2
              }}
              onPress={() =>
                navigation.navigate('UserProfile', {
                  fullName: 'Shayna Melinda',
                  profession: 'Product Designer',
                  photo: DummyDoctor2
                })
              }
            />
            <Text style={styles.welcome}>Mau konsultasi dengan siapa hari ini?</Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                <DoctorCategory category="dokter umum" onPress={() => {}} />
                <DoctorCategory category="psikiater" onPress={() => {}} />
                <DoctorCategory category="dokter obat" onPress={() => {}} />
                <DoctorCategory category="dokter umum" onPress={() => {}} />
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            <RatedDoctor
              name="Alexa Rachel"
              desc="Pediatrician"
              avatar={DummyDoctor1}
              onPress={() => navigation.navigate('DoctorProfile')}
            />
            <RatedDoctor
              name="Sunny Frank"
              desc="Dentist"
              avatar={DummyDoctor2}
              onPress={() => navigation.navigate('DoctorProfile')}
            />
            <RatedDoctor
              name="Poe Minn"
              desc="Podiatrist"
              avatar={DummyDoctor3}
              onPress={() => navigation.navigate('DoctorProfile')}
            />
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          <NewsItem
            title="Is it safe to stay at home
                during coronavirus?"
            date="Today"
            image={DummyNews1}
          />
          <NewsItem
            title="Consume yellow citrus helps you healthier"
            date="Today"
            image={DummyNews2}
          />
          <NewsItem
            title="Learn how to make a proper orange juice at home"
            date="Today"
            image={DummyNews3}
          />
          <Gap height={30} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  wrapperSection: { paddingHorizontal: 16 },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209
  },
  category: { flexDirection: 'row' },
  wrapperScroll: { marginHorizontal: -16 },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16
  }
});
