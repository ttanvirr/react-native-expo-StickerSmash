import { Image } from "expo-image"
import { ImageSourcePropType, StyleSheet } from "react-native"

type Props = {
  imgSource: ImageSourcePropType
}

export default function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    // width and height/aspect ratio required
    width: "85%",
    aspectRatio: 320 / 440,
    borderRadius: 18,
  },
})
