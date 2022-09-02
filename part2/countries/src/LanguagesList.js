const LanguagesList = ({ data }) => {
  const list = Object.entries(data).map((item) => <li key={item[0]}>{item[1]}</li>)
  return <ul>{list}</ul>
}

export default LanguagesList
