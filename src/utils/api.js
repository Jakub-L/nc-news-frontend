import axios from 'axios';
const BASE_URL = 'https://nc-news-jakub.herokuapp.com/api';

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data.topics;
};

export const getArticles = async (topic, sortBy, sortOrder, page, author) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles?sort_by=${sortBy}&order=${sortOrder}${
      topic ? `&topic=${topic}` : ''
    }${page > 1 ? `&p=${page}` : ''}${author ? `&author=${author}` : ''}`
  );
  return [data.articles, data.total_count];
};

export const getArticleByID = async id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${id}`);
  return data.article;
};

export const getCommentsByArticle = async (article_id, page) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments${page > 1 ? `?p=${page}` : ''}`
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
  await axios.delete(`${BASE_URL}/comments/${id}`);
};
