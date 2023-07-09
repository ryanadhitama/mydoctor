/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from '../../assets';
import { Button, Gap, Header, Link } from '../../components';
import { colors, fonts } from '../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';

export type UploadPhotoProps = {
  navigation: any;
  route: {
    params: {
      fullName: string;
      profession: string;
      uid: string;
    };
  };
};

const UploadPhoto = ({ navigation, route }: UploadPhotoProps) => {
  const { fullName, profession, uid } = route.params;
  const [photoForDB, setPhotoForDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    return false;
  };

  const uploadAndContinue = () => {
    return false;
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header
        title="Upload Photo"
        onPress={() => {
          Alert.alert('Mohon upload foto terlebih dahulu');
        }}
      />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{profession}</Text>
        </View>
        <View>
          <Button disable={!hasPhoto} title="Upload and Continue" onPress={uploadAndContinue} />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => {
              return false;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.white },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between'
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  avatar: { width: 110, height: 110, borderRadius: 110 / 2 },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addPhoto: { position: 'absolute', bottom: 8, right: 6 },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center'
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4
  }
});
