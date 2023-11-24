import { ICatalogue } from 'src/types/types';

export default function getFilterValues(
  data: ICatalogue[],
  key: keyof ICatalogue,
) {
  const filteredValues = new Set(data.map((item: any) => item[key]));
  return Array.from(filteredValues);
}
