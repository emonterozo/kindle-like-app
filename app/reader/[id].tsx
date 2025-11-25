import { Header } from "@/components";
import { books } from "@/constant/constant";
import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Reader() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      const book = books.find((b) => b.id === id);
      try {
        const asset = Asset.fromModule(book?.file!);
        await asset.downloadAsync();

        const file = new File(asset.localUri!);
        const data = await file.text();
        setText(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Book Preview" handlePressBack={() => router.back()} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scrollView: {
    marginTop: 16,
  },
  text: {
    color: "#666",
    fontSize: 13,
    padding: 10,
  },
});
