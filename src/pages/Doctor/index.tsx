/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DoctorCategory, Gap, HomeProfile, NewsItem, RatedDoctor } from '../../components';
// import { Fire } from '../../config';
import { colors, fonts, getData } from '../../utils';
import { DummyDoctor1, DummyDoctor2, DummyDoctor3, ILNullPhoto } from '../../assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/Fire';

const Doctor = ({ navigation }: any) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: ''
  });

  const getUserData = () => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setProfile(res);
    });
  };

  useEffect(() => {
    getCategoryDoctor();
    getNews();
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, [navigation]);

  const getNews = () => {
    onValue(ref(db, 'news/'), (res) => {
      if (res.val()) {
        const data = res.val();
        const filterData = data.filter((el: any) => el !== null);
        setNews(filterData);
      }
    });
  };

  const getCategoryDoctor = () => {
    onValue(ref(db, 'category_doctor/'), (res) => {
      if (res.val()) {
        const data = res.val();
        const filterData = data.filter((el: any) => el !== null);
        setCategoryDoctor(filterData);
      }
    });
  };

  return (
    <SafeAreaView style={styles.page} edges={['top']}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile', profile)}
            />
            <Text style={styles.welcome}>Mau konsultasi dengan siapa hari ini?</Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map((item: any, i: number) => {
                  return (
                    <DoctorCategory
                      key={`category-${i}`}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                    />
                  );
                })}
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
          {news.map((item: any, i: number) => {
            return (
              <NewsItem key={`news-${i}`} title={item.title} date={item.date} image={item.image} />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white
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
