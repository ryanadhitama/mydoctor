import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, ChatItem, InputChat } from '../../components';
import { fonts, colors, getData, getChatTime, setDateChat } from '../../utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onValue, push, ref, set } from 'firebase/database';
import { db } from '../../config/Fire';

const Chatting = ({ navigation, route }: any) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({
    email: '',
    fullName: '',
    photo: '',
    profession: '',
    uid: ''
  });
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const chatID = `${user?.uid}_${dataDoctor.data.uid}`;

    const urlFirebase = `chatting/${chatID}/allChat/`;
    onValue(ref(db, urlFirebase), (snapshot) => {
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const allDataChat: any = [];
        Object.keys(dataSnapshot).map((key) => {
          const dataChat = dataSnapshot[key];

          const newDataChat: any = [];

          Object.keys(dataChat).map((itemChat) => {
            newDataChat.push({
              id: itemChat,
              data: dataChat[itemChat]
            });
          });

          allDataChat.push({
            id: key,
            data: newDataChat
          });
        });
        setChatData(allDataChat);
      }
    });
  }, [dataDoctor.data.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then((res) => {
      setUser(res);
    });
  };

  const chatSend = () => {
    const today = new Date();
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent
    };
    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid
    };
    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid
    };

    push(ref(db, urlFirebase), data);
    setChatContent('');
    set(ref(db, urlMessageUser), dataHistoryChatForUser);
    set(ref(db, urlMessageDoctor), dataHistoryChatForDoctor);
  };
  return (
    <SafeAreaView style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.profession}
        photo={{ uri: dataDoctor.data.photo }}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={(scroll: any) => {
            this.scroll = scroll;
          }}
          onContentSizeChange={() => this.scroll.scrollToEnd()}
        >
          {chatData.map((chat: any) => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map((itemChat: any) => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : { uri: dataDoctor.data.photo }}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={(value: string) => setChatContent(value)}
        onButtonPress={chatSend}
        targetChat={dataDoctor}
      />
    </SafeAreaView>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { flex: 1 },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center'
  }
});
