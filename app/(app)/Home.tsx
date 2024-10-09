import { StyleSheet, View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSession } from "../../context/context";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import ChatList from "@/components/ChatList";
import { usersRef } from "@/firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";

export default function Home() {
  const { user } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
    return () => {};
  }, []);

  const getUsers = async () => {
    // fetch users that are not logged in
    const q = query(usersRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(q);
    let data: any = []; // :UserData
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList users={users} router={router} />
      ) : (
        <View style={{ flex: 1, alignItems: "center", paddingTop: 30 }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
