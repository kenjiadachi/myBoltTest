import { app } from '../initializers/bolt'
import fetchTasks from '../functions/fetchTasks'
import { slackIdToNotionId } from '../functions/convertIds'

export default (): void => {
  app.message(`irori get my tasks`, async ({ message, say }): Promise<void> => {
    const userNotionId = slackIdToNotionId(message.user)
    const taskTitles = await formattedText(userNotionId)
    
    await say(taskTitles)
  })
}

const formattedText = async (userNotionId: string): Promise<string> => {
  let text: string = ''
  const bodyParameters = {
    filter: {
      and: [
        {
          property: 'status',
          select: {
            does_not_equal: 'DONE'
          }
        },
        {
          property: 'Asignee',
          people: {
            contains: userNotionId
          }
        },
      ]
    }
  }
  try {
    const results = await fetchTasks(bodyParameters)
    results.forEach((result) => {
      text = `${text}\nassignee: ${result.assignee}, startsAt: ${result.startsAt}, endsAt: ${result.startsAt}, status: ${result.status}, <${result.url}|${result.title}>`
    })
    return text
  } catch (error) {
    return 'something happened'
  }
}