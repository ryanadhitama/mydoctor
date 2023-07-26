import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Header, Profile, ProfileItem, Gap } from '../../components';
import { colors } from '../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';

const DoctorProfile = ({ navigation, route }: any) => {
  const dataDoctor = route.params;
  return (
    <SafeAreaView style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile
        name={dataDoctor.data.fullName}
        desc={dataDoctor.data.profession}
        photo={{ uri: dataDoctor.data.photo }}
      />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value={dataDoctor.data.university} />
      <ProfileItem label="Tempat Praktik" value={dataDoctor.data.hospital_address} />
      <ProfileItem label="No. STR" value={dataDoctor.data.str_number} />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting', dataDoctor)}
        />
      </View>
    </SafeAreaView>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  action: { paddingHorizontal: 40, paddingTop: 23 }
});
