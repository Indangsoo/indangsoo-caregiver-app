import { Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { observer } from "mobx-react-lite"
import { FC, useEffect, useRef, useState } from "react"
import { ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"
import { $styles } from "@/theme"
import WebView from "react-native-webview"

interface CamScreenProps extends AppStackScreenProps<"Cam"> {}

export const CamScreen: FC<CamScreenProps> = observer(function CamScreen() {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  useEffect(() => {
    // reload webview after 5 minutes
    const interval = setInterval(() => {
      webViewRef.current?.reload()
    }, 1000 * 60 * 5)
    return () => clearInterval(interval)
  }, [])

  return (
    <Screen
      style={$root}
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.container}
    >
      <Text text="cam" style={{
        marginBottom: 100
      }}/>
      {loading && <Text text="Loading..." />}
      <WebView
      ref={webViewRef}
      source={{ uri: "http://59.187.251.226:24549/janus"}}
      onLoad={() => setLoading(false)}
      onError={(e) => console.log(e)}
      originWhitelist={["https://*", "http://*", "file://*"]}
      style={{
        width: "100%",
        height: 270,
        flex: 1,
      }}/>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
