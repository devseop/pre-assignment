import axios from 'axios';
import { CATALOGUES_DATA_URL } from 'src/constant/constant';

export default async function loadCatalogueData() {
  try {
    const response = await axios.get(CATALOGUES_DATA_URL);
    const result = await response.data;

    return result;
  } catch (error) {
    console.error(error);
  }
}
