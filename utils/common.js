export const getRoomID = (user1, user2) => {
  const sortedIDS = [user1, user2].sort();
  const roomID = sortedIDS.join("-");
  return roomID;
};
