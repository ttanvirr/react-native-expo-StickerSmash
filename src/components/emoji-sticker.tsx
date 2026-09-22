import { ImageSourcePropType } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

type Props = {
  stickerSource: ImageSourcePropType
  imageSize: number
}

export default function EmojiSticker({ stickerSource, imageSize }: Props) {
  const scaleImage = useSharedValue(imageSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      // if already not doubled, double it
      // if already doubled, halve it
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2)
      }
    })

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX
    translateY.value += event.changeY
  })

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    }
  })

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[{ top: -350 }, containerStyle]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode={"contain"}
            style={[{ width: imageSize, height: imageSize }, imageStyle]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  )
}
