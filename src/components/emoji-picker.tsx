import { MaterialIcons } from "@react-native-vector-icons/material-icons"
import React from "react"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
  isVisible: boolean
  onClose: () => void
  children?: React.ReactNode
}

export default function EmojiPicker({ isVisible, onClose, children }: Props) {
  return (
    <View>
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose a sticker</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color={"#fff"} size={22} />
            </Pressable>
          </View>
          {children}
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464c55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
})
