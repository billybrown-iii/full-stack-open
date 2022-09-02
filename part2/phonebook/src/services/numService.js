import axios from "axios"
const url = "http://localhost:3001/persons/"

const getAll = () => {
  return axios.get(url)
}

const addNumber = (newEntry) => {
  return axios.post(url, newEntry)
}

const updateEntry = (newEntry, match) => {
  return axios.put(url + match.id, newEntry).then((response) => response.data)
}

const deleteEntry = (id) => {
  if (window.confirm("Do you really wanna delete it?")) return axios.delete(url + id)
}

const numService = { getAll, addNumber, updateEntry, deleteEntry }

export default numService
