export const getChatTime = (date: Date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = (oldDate: Date) => {
  const year = oldDate.getFullYear();
  const month = oldDate.getMonth() + 1;
  const date = oldDate.getDate();

  return `${year}-${month}-${date}`;
};
