import { Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

interface LogScreenProps extends AppStackScreenProps<"Log"> {}

export const LogScreen: FC<LogScreenProps> = observer(function LogScreen() {
  const { themed } = useAppTheme()
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen
      style={$root}
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.container}
    >
      <Text text="최근 기록" style={themed($title)} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $title: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.normal,
  fontSize: 18,
})
