import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ILLogo } from '../../assets';
import { Button, Gap, Input, Link } from '../../components';
import { colors, fonts, showError, storeData, useForm } from '../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { auth, db } from '../../config/Fire';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';

export type LoginProps = {
  navigation: any;
};

const Login = ({ navigation }: LoginProps) => {
  const [form, setForm] = useForm({ email: '', password: '' });
  const dispatch = useDispatch();

  const login = async () => {
    dispatch({ type: 'SET_LOADING', value: true });
    try {
      const credential = await signInWithEmailAndPassword(auth, form.email, form.password);
      setForm('reset');
      onValue(ref(db, 'users/' + credential.user.uid), (querySnapShot) => {
        if (querySnapShot.val()) {
          storeData('user', querySnapShot.val());
          navigation.replace('MainApp');
        }
      });
    } catch (error: any) {
      showError(error.message);
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <ILLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <Input
          label="Email Address"
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
        <Gap height={10} />
        <Link title="Forgot My Password" size={12} />
        <Gap height={40} />
        <Button title="Sign In" onPress={login} />
        <Gap height={30} />
        <Link
          title="Create New Account"
          size={16}
          align="center"
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: { paddingHorizontal: 40, backgroundColor: colors.white, flex: 1 },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153
  }
});
