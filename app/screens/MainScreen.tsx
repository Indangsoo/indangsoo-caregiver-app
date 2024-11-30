import { Checkbox, Screen, Text, TowelProgressBar } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface MainScreenProps extends AppStackScreenProps<"Main"> {}

export const MainScreen: FC<MainScreenProps> = observer(function MainScreen() {
  const { themed } = useAppTheme()
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen
      style={$root}
      safeAreaEdges={["top"]}
      preset="scroll"
      contentContainerStyle={$container}
    >
      <Text text="홈" style={themed($title)} />
      <TowelProgressBar style={$progressBar} />
      <View style={$checkboxContainer}>
        <Text text="위험 상황 여부" style={themed($checkboxText)} />
        <Checkbox />
      </View>
      <View style={$checkboxContainer}>
        <Text text="차량 열림 여부" style={themed($checkboxText)} />
        <Checkbox />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  justifyContent: "flex-start",
  gap: 30,
  alignItems: "flex-start",
  padding: 20,
}

const $title: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.bold,
  fontSize: 18,
})

const $progressBar: ViewStyle = {
  width: "100%",
}

const $checkboxContainer: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
}

const $checkboxText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.normal,
  fontSize: 16,
})
