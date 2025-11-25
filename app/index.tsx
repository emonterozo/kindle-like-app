import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Header } from "@/components";
import { books } from "../constant/constant";

type Preview = {
  id: string;
  title: string;
  preview: string;
};

export default function Index() {
  const router = useRouter();
  const [preview, setPreview] = useState<Preview[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const newPreviews: Preview[] = [];

        for (const book of books) {
          const asset = Asset.fromModule(book.file);
          await asset.downloadAsync();

          const file = new File(asset.localUri!);
          const data = await file.text();

          newPreviews.push({
            id: book.id,
            title: data.slice(0, book.skip),
            preview: data.slice(book.skip, 400),
          });
        }

        setPreview(newPreviews);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const renderItem = ({ item }: { item: Preview }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.preview}>{item.preview.trimStart()}...</Text>
      <TouchableOpacity onPress={() => router.push(`/reader/${item.id}`)}>
        <Text style={styles.action}>Read more</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Book List" />
      <FlatList
        data={preview}
        renderItem={renderItem}
        keyExtractor={(b) => b.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  preview: {
    color: "#666",
    fontSize: 13,
    marginVertical: 8,
  },
  action: {
    color: "#007bff",
    fontWeight: "500",
  },
  list: {
    paddingTop: 16,
  },
});
