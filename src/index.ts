import { app } from './initializers/bolt'
import echo from './commands/echo'
import getAllTasks from './commands/getAllTasks'
import getMyTasks from './commands/getMyTasks'

;(async () => {
  // Start your app
  const server = await app.start(8080)

  console.log(`⚡️ Bolt app is running! PORT: ${server.address().port}`)
})()

echo()
getAllTasks()
getMyTasks()