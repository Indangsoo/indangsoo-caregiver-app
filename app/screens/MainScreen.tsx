import { Button, ProgressBar, Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface MainScreenProps extends AppStackScreenProps<"Main"> {}

export const MainScreen: FC<MainScreenProps> = observer(function MainScreen() {
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
      <Text text="main" />
      <Button onPress={() => {}}>버튼</Button>
      <ProgressBar style={$progressBar} />
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
  justifyContent: "center",
  gap: 10,
  alignItems: "center",
  paddingHorizontal: 20,
}

const $progressBar: ViewStyle = {
  width: "100%",
}
