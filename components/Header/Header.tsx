import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ChevronLeftIcon } from "@/assets/icons";

type Props = {
  title: string;
  handlePressBack?: () => void;
};

export default function Header({ title, handlePressBack }: Props) {
  return (
    <View style={styles.container}>
      {handlePressBack && (
        <TouchableOpacity style={styles.back} onPress={handlePressBack}>
          <ChevronLeftIcon />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  back: {
    position: "absolute",
    zIndex: 999,
    left: 24,
    width: 50,
    height: 50,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
  },
});
