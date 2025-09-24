import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = async (country) => {
  const response = await axios.get(`${baseUrl}/name/${country}`);
  return response.data;
};

export default getAllCountries;
