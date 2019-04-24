import axios from 'axios';
const BASE_URL = 'http://nc-news-jakub.herokuapp.com/api';

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

export const getArticles = async (topic, sortBy, sortOrder) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles?limit=50&sort_by=${sortBy}&order=${sortOrder}${
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

export const getUserByUsername = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
};

export const vote = async (inc_votes, id, section) => {
  const { data } = await axios.patch(`${BASE_URL}/${section}s/${id}`, {
    inc_votes,
  });
  return data[section];
};

export const postComment = async (id, username, body) => {
  const { data } = await axios.post(`${BASE_URL}/articles/${id}/comments`, {
    username,
    body,
  });
  return data.comment;
};

export const deleteComment = async id => {
  const { status } = await axios.delete(`${BASE_URL}/comments/${id}`);
  return status;
};
