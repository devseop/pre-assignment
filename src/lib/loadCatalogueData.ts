import axios from 'axios';
import { CATALOGUES_DATA_URL } from 'src/constant/constant';
import { ICatalogue } from 'src/types/types';

export async function loadCatalogueList() {
  try {
    const response = await axios.get(CATALOGUES_DATA_URL);
    const result = await response.data;

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function loadCatalogueById(params: any) {
  try {
    const response = await axios.get(CATALOGUES_DATA_URL);
    const catalogues = response.data;

    const result = catalogues.find(
      (item: ICatalogue) => item._id === params.id,
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}
