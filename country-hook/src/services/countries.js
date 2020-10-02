import axios from 'axios'



const getOne= async (name) => {
  const baseUrl = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  try {
    const response = await axios.get(baseUrl)
    console.log(response)
    return response.data
  } catch (exception) {
    return null
  }
}

export default {getOne}