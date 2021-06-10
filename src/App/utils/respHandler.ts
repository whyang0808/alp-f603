import { message } from 'antd'

type Type =
  'success' |
  'error' |
  'load' |
  'warning'

export const handleFatal = (error: Error) => {
  return {
    success: false,
    message: error.message.toString() || 'Whoops. An error occured. Pleasse try again.'
  }
}

const responseHandler = <T extends string | Error>(resp: T, type: Type) => {
  message.destroy()

  if (type === 'success') {
    message.success(resp, 5)
  } else if (type === 'error') {
    const error = handleFatal(resp as Error)
    message.error(error.message, 10)
  } else if (type === 'load') {
    message.loading(resp, 0)
  } else if (type === 'warning') {
    message.warning(resp, 10)
  }
}

export default responseHandler
