import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import UserInfo from "./UserInfo";

export default function ListUsers() {
  const uid = auth.currentUser.uid;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      const userRef = collection(db, "users");

      const queryRef = query(userRef, where("userId", "!=", uid));

      const getUsers = onSnapshot(queryRef, (snapshot) => {
        const allUsers = [];
        console.log(snapshot);
        snapshot.forEach((doc) => {
          allUsers.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setUsers(allUsers);
      });
    };

    getAllUsers();
  }, []);
  return (
    <View>
      {users ? (
        <View>
          {users?.map((data, index) => {
            return <UserInfo key={index} user={data} />;
          })}
        </View>
      ) : (
        <View>
          <Text>Not Found</Text>
        </View>
      )}
    </View>
  );
}
