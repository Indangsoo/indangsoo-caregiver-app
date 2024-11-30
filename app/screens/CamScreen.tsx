import { Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"
import { $styles } from "@/theme"

interface CamScreenProps extends AppStackScreenProps<"Cam"> {}

export const CamScreen: FC<CamScreenProps> = observer(function CamScreen() {
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
      <Text text="cam" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
