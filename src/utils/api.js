import axios from 'axios';
const BASE_URL = 'http://nc-news-jakub.herokuapp.com/api';

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

export const getArticles = async (topic, sortBy, sortOrder) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles?sort_by=${sortBy}&order=${sortOrder}${
      topic ? `&topic=${topic}` : ''
    }`
  );
  return data.articles;
};

export const getArticleByID = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data.article;
};

export const getCommentsByArticle = async article_id => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments`
  );
  return data.comments;
};
