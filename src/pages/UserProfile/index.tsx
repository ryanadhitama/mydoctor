import React from 'react';
import { StyleSheet } from 'react-native';
import { Gap, Header, List, Profile } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfile = ({ navigation, route }: any) => {
  const profile = route.params;

  const signOut = () => {
    return false;
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile name={profile.fullName} desc={profile.profession} photo={profile.photo} />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List name="Languange" desc="Last Update Yesterday" type="next" icon="language" />
      <List name="Give Us Rate" desc="Last Update Yesterday" type="next" icon="rate" />
      <List
        name="Sign Out"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={signOut}
      />
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' }
});
