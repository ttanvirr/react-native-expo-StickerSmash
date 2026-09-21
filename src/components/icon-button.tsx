import {
  MaterialIcons,
  MaterialIconsIconName,
} from "@react-native-vector-icons/material-icons"
import { Pressable, StyleSheet, Text } from "react-native"

type Props = {
  icon: MaterialIconsIconName
  label: string
  onPress: () => void
}

export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.iconButton}>
      <MaterialIcons name={icon} size={24} color={"#fff"} />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
})
