import { useEffect, useState } from "react"
import { io } from "socket.io-client"

// const URI = process.env.SERVER_URI
const URI = "http://59.187.251.226:54549"

export default function useRealtimeData<T>(query: string) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const socket = io(URI)
    const fetchData = async () => {
      console.log(`${URI}${query}/data`)
      try {
        const response = await fetch(`${URI}${query}/data`)
        const result = await response.json()
        console.log(result)
        setData(result)
      } catch (err: any) {
        setError(err)
      }
    }

    fetchData()

    const handleRealtimeUpdate = (update: string) => {
      try {
        const parsedUpdate = JSON.parse(update)
        setData(parsedUpdate)
      } catch (err: any) {
        setError(err)
      }
    }

    socket.on(query, handleRealtimeUpdate)
    return () => {
      socket.off(query, handleRealtimeUpdate)
      socket.disconnect()
    }
  }, [query])

  return { data, error }
}
