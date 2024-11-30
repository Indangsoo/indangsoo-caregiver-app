import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import useRealtimeData from "@/utils/useRealtimeData"
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

interface TowelData {
  num: number
}

export const TowelProgressBar = observer(function ProgressBar(props: ProgressBarProps) {
  const { style } = props
  const $styles = [$container, style]
  const { themed } = useAppTheme()

  const { data: towelData, error: towelError } = useRealtimeData<TowelData>("/toilet/towel")

  console.log("data:", towelData, ", errorMsg:", towelError?.message)
  if (!towelData) return <Text style={themed($text)}>수건 잔량을 불러오는 중...</Text>
  if (towelError) return <Text style={themed($text)}>수건 잔량을 불러오는 데에 실패했습니다. </Text>

  const { num: towelNum } = towelData

  const towelColor = towelNum <= 20 ? "red" : towelNum >= 80 ? "#2FA55D" : undefined

  return (
    <View style={$styles}>
      <Text style={themed($text)}>수건 잔량 {towelNum}%</Text>
      <Progress.Bar progress={towelNum / 100} width={null} height={30} color={towelColor} />
      {towelError && <Text style={themed($text)}>Error: {JSON.stringify(towelError)}</Text>}
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
