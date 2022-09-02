const Message = ({ message }) => {
  if (!message) return null

  return (
    <div style={outerStyles}>
      <div style={message.includes("error") ? errorStyles : innerStyles}>{message}</div>
    </div>
  )
}

const outerStyles = {
  height: 100,
  width: 500,
  border: "4px solid #333",
}

const innerStyles = {
  fontSize: 24,
  width: 300,
  margin: "10px auto",
}

const errorStyles = {
  fontSize: 24,
  width: 300,
  margin: "10px auto",
  color: "magenta",
}

export default Message
