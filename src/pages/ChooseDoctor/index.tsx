import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Header, List } from '../../components';
import { colors } from '../../utils';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/Fire';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChooseDoctor = ({ navigation, route }: any) => {
  const [listDoctor, setListDoctor] = useState([]);
  const itemCategory = route.params;
  useEffect(() => {
    callDoctorByCategory();
  }, [itemCategory.category]);

  const callDoctorByCategory = () => {
    onValue(ref(db, 'doctors/'), (res) => {
      if (res.val()) {
        const data = res.val();
        const filterData = data.filter((el: any) => el !== null);
        setListDoctor(filterData);
        console.log(filterData);
      }
    });
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header
        type="dark"
        title={`Pilih ${itemCategory.category}`}
        onPress={() => navigation.goBack()}
      />
      {listDoctor.map((doctor: any) => {
        return (
          <List
            key={doctor.id}
            type="next"
            profile={{ uri: doctor.data.photo }}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate('DoctorProfile', doctor)}
          />
        );
      })}
    </SafeAreaView>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 }
});
