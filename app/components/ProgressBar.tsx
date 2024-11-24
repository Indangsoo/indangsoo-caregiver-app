import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { observer } from "mobx-react-lite"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import * as Progress from "react-native-progress"
import { Text } from "./Text"

export interface ProgressBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */

export const ProgressBar = observer(function ProgressBar(props: ProgressBarProps) {
  const { style } = props
  const $styles = [$container, style]
  const { themed } = useAppTheme()

  return (
    <View style={$styles}>
      <Text style={themed($text)}>수건 잔량</Text>
      <Progress.Bar progress={0.5} width={null} height={30} />
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.normal,
  fontSize: 18,
})
