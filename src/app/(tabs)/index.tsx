import * as ImagePicker from "expo-image-picker"
import { StyleSheet, View } from "react-native"

import Button from "@/components/button"
import ImageViewer from "@/components/image-viewer"
import { useState } from "react"

const PlaceholderImage = require("@/assets/images/background-image.png")

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  )

  const pickeImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    } else {
      alert("You did not select any image.")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme="primary"
          label="Choose a photo"
          onPress={pickeImageAsync}
        />
        <Button label="Use this photo" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // `View` is already a flex container
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  imageContainer: {
    flex: 1,
    // borderWidth: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    // borderWidth: 1,
  },
})
