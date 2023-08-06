import React from 'react';
import IsMe from './IsMe';
import Other from './Other';

type ChatItemType = {
  isMe?: boolean;
  text: string;
  date: string;
  photo?: {
    uri: string;
  };
};

const ChatItem = ({ isMe, text, date, photo }: ChatItemType) => {
  if (isMe) {
    return <IsMe text={text} date={date} />;
  }
  return <Other text={text} date={date} photo={photo} />;
};

export default ChatItem;
