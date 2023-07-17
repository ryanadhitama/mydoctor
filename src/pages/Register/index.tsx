import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Gap, Header, Input } from '../../components';
import { colors, showError, storeData, useForm } from '../../utils';
import { useDispatch } from 'react-redux';
import { app, auth } from '../../config/Fire';

export type RegisterProps = {
  navigation: any;
};

const Register = ({ navigation }: RegisterProps) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: ''
  });

  const onContinue = () => {
    dispatch({ type: 'SET_LOADING', value: true });
    auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success: any) => {
        dispatch({ type: 'SET_LOADING', value: false });
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid
        };

        app
          .database()
          .ref('users/' + success.user.uid + '/')
          .set(data);

        storeData('user', data);
        navigation.navigate('UploadPhoto', data);
      })
      .catch((err: any) => {
        dispatch({ type: 'SET_LOADING', value: false });
        showError(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={(value: string) => setForm('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={form.profession}
            onChangeText={(value: string) => setForm('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={(value: string) => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value: string) => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Continue" onPress={onContinue} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { padding: 40, paddingTop: 0 }
});
