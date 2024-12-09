import { ListItem, ListView, Screen, Text } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { observer } from "mobx-react-lite"
import { FC, useCallback, useEffect, useState } from "react"
import { TextStyle, ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"
import { $styles, ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { RefreshControl } from "react-native-gesture-handler"

interface LogScreenProps extends AppStackScreenProps<"Log"> {}

type EventType = "car_danger" | "stuff_call" | "indoor_danger" | "towel_change" | "car_open"

interface LogItem {
  time: number
  event_type: EventType
  data: any
}

const eventTypeMap: Record<EventType, string> = {
  car_danger: "차량 위험",
  stuff_call: "물건 찾기",
  indoor_danger: "실내 비상 호출",
  towel_change: "수건 개수 변경",
  car_open: "차량 문 열림",
}

export const LogScreen: FC<LogScreenProps> = observer(function LogScreen() {
  const { themed } = useAppTheme()
  const [logs, setLogs] = useState<LogItem[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch("http://59.187.251.226:54549/getevents")
      if (!res.ok) throw new Error("Failed to fetch logs")
      const logs = await res.json()
      setLogs(logs.filter((log: LogItem) => log.event_type !== "towel_change"))
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchLogs()
    setRefreshing(false)
  }

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
      ScrollViewProps={{
        refreshControl: <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />,
      }}
    >
      <Text text="최근 기록" style={themed($title)} />
      <ListView
        data={logs}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <ListItem height={30} bottomSeparator>
            {new Date(item.time * 1000).toLocaleString() + " : " + eventTypeMap[item.event_type]}
          </ListItem>
        )}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $title: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.bold,
  fontSize: 18,
})
