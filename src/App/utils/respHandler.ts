import { message } from 'antd'

type Type =
  'success' |
  'error' |
  'load' |
  'warning'

export const handleFatal = (error: Error) => {
  return {
    success: false,
    message: error.message?.toString() || 'Whoops. An error occured. Pleasse try again.'
  }
}

const responseHandler = <T extends string | Error>(resp: T, type: Type, duration: number = 3) => {
  message.destroy()

  if (type === 'success') {
    message.success(resp, duration)
  } else if (type === 'error') {
    const error = handleFatal(resp as Error)
    message.error(error.message, duration)
  } else if (type === 'load') {
    message.loading(resp, duration)
  } else if (type === 'warning') {
    message.warning(resp, duration)
  }
}

export default responseHandler
