import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Index</Text>
        <ActivityIndicator size="large" color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
