import { app } from '../initializers/bolt'

export default function() {
  app.command(`/echo`, async ({ command, ack, say }) => {
    ack()

    say(`発言: ${command.text}`)
  })
}