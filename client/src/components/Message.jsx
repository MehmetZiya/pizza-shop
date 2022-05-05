import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return (
    <Alert className='mx-auto text-center' variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
