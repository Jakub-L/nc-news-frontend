import axios from 'axios';
const BASE_URL = 'http://nc-news-jakub.herokuapp.com/api';

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};
