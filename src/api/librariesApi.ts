import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://libraries.io/api/search';

export const searchModules = async (query: string, page: number = 1) => {
  const response = await axios.get(API_URL, {
    params: {
      q: query,
      api_key: API_KEY,
      page: page,
      per_page: 5,
      sort: 'stars',
    },
  });

  return response.data;
};
