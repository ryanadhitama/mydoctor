import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { ILNullPhoto } from '../../assets';
import { Button, Gap, Header, Input, Profile } from '../../components';
import { colors, getData, showError, showSuccess, storeData } from '../../utils';
import { UploadFolder, auth, db, uploadFile } from '../../config/Fire';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref, set } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { updatePassword } from 'firebase/auth';

const UpdateProfile = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    uid: '',
    fullName: '',
    profession: '',
    email: '',
    photo: ''
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setPhoto(tempPhoto);
      setPhotoForDB(res?.photo);
      setProfile(data);
    });
  }, []);

  const update = async () => {
    dispatch({ type: 'SET_LOADING', value: true });
    try {
      if (password.length > 0) {
        if (password.length < 6) {
          showError('Password kurang dari 6 karater');
        } else {
          updatePass();
          await updateProfileData();
        }
      } else {
        await updateProfileData();
      }
      showSuccess('Berhasil update profile');
    } catch (error) {
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  const updatePass = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        updatePassword(user, password)
          .then(() => {
            // Update successful.
          })
          .catch((error) => {
            showError(error?.message);
          });
      }
    });
  };

  const updateProfileData = async () => {
    const data = profile;
    data.photo = photoForDB;
    await set(ref(db, 'users/' + data.uid), data);
    storeData('user', data);
  };

  const changeText = (key: string, value: any) => {
    setProfile({
      ...profile,
      [key]: value
    });
  };

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      {
        quality: 1,
        maxWidth: 200,
        maxHeight: 200,
        mediaType: 'photo'
      },
      async (response: any) => {
        if (response.didCancel || response.error) {
          showError('Oops, pilih foto terlebih dahulu');
        } else {
          const source = { uri: response.assets[0].uri };
          setPhoto(source);
          const res = await uploadFile(response?.assets[0]?.uri, UploadFolder.USER);
          setPhotoForDB(res?.url);
        }
      }
    );
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value: string) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value: string) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value: string) => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { padding: 40, paddingTop: 0 }
});
