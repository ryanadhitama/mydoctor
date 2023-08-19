import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from '../../components';
import { colors, fonts, getData } from '../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../config/Fire';
import { onValue, ref } from 'firebase/database';

const Messages = ({ navigation }: any) => {
  const [user, setUser] = useState({
    email: '',
    fullName: '',
    photo: '',
    profession: '',
    uid: ''
  });
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getDataUserFromLocal();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      const urlHistory = `messages/${user.uid}/`;
      onValue(ref(db, urlHistory), async (snapshot) => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data: any = [];
          const promises = await Object.keys(oldData).map(async (key) => {
            const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
            onValue(ref(db, urlUidDoctor), async (s) => {
              if (s.val()) {
                data.push({
                  id: key,
                  detailDoctor: s.val()?.data,
                  ...oldData[key]
                });
              }
            });
          });
          await Promise.all(promises);
          setHistoryChat(data);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then((res) => {
      setUser(res);
    });
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map((chat: any) => {
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor
          };
          return (
            <List
              key={chat.id}
              profile={{ uri: chat.detailDoctor.photo }}
              name={chat.detailDoctor.fullName}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting', dataDoctor)}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16
  }
});
