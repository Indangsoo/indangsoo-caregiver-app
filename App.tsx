import App from "@/app"
import "@expo/metro-runtime"
import messaging from "@react-native-firebase/messaging"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { Alert } from "react-native"

SplashScreen.preventAutoHideAsync()

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("[Background Remote Message]", remoteMessage)
})

function IgniteApp() {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken()
    console.log("[FCM Token] ", fcmToken)
  }

  useEffect(() => {
    getFcmToken()
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const msg = JSON.stringify(remoteMessage)
      if (remoteMessage.notification)
        Alert.alert(remoteMessage.notification.title || "", remoteMessage.notification.body)
    })
    return unsubscribe
  }, [])

  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
