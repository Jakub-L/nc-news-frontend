import React, { Component } from 'react';
import '../styles/Article.css';
import Comment from './Comment';

class Article extends Component {
  state = {
    loading: 'true',
    article: {
      author: 'jessjelly',
      title:
        'Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams',
      article_id: 30,
      body:
        "What if, for once, your Thanksgiving sides were just as dazzling as the centerpiece turkey? Imagine a world where presenting a platter of seasonal vegetables inspires the same amount of cooing that the turkey does. Welcome to the world of twice-baked butternut squash. Sure, you could just roast some squash wedges and call it a day. But where's the fun in that? To make this year's most impressive vegetable side, Epi's food director Rhoda Boone gave super-seasonal butternut squash the twice-baked potatoes treatment: Mash the inside of the vegetable with butter, cream, and anything else that might make it more delicious, then pile it back into the vegetable, bake it until golden and velvety. The result is a jaw-dropping, brightly colored sweet-meet-savory butternut squash side dish. Here are just a few more reasons this creation belongs on this year's Thanksgiving table:",
      topic: 'cooking',
      created_at: '2018-05-06T02:40:35.489Z',
      votes: 0,
      comment_count: '8',
    },
    comments: [
      {
        comment_id: 71,
        votes: 7,
        created_at: '2017-07-21T20:12:05.948Z',
        author: 'cooljmessy',
        body:
          'Recusandae dolorem consequatur non a accusantium ea. Ut repudiandae doloremque expedita perspiciatis voluptas. Optio adipisci consequuntur. Reprehenderit veritatis eos voluptatem sed alias voluptatem atque. Eos repudiandae enim quos tenetur eos deserunt perspiciatis aut velit.',
      },
      {
        comment_id: 232,
        votes: 1,
        created_at: '2017-07-17T07:23:49.144Z',
        author: 'tickle122',
        body:
          'Ullam distinctio voluptatem nostrum neque eos quam sunt dolore sed. Quibusdam velit fugit molestiae harum quia. Est deserunt quod est earum ipsum quibusdam dolorem et. Exercitationem culpa consequuntur ut labore possimus quia magni iure.',
      },
      {
        comment_id: 296,
        votes: 19,
        created_at: '2017-01-22T11:50:36.669Z',
        author: 'happyamy2016',
        body:
          'Ab impedit reprehenderit. Eligendi a asperiores. Vel ut modi inventore molestiae cum delectus et. Reiciendis excepturi eveniet.',
      },
      {
        comment_id: 16,
        votes: 1,
        created_at: '2017-01-21T01:41:31.479Z',
        author: 'happyamy2016',
        body:
          'Saepe iure voluptas aut cum occaecati illo. Unde neque et qui facilis cupiditate animi distinctio.',
      },
      {
        comment_id: 236,
        votes: 16,
        created_at: '2017-01-16T02:55:42.377Z',
        author: 'happyamy2016',
        body:
          'Velit ut aut quia saepe dicta. Omnis hic voluptates doloremque earum voluptatibus pariatur. Natus error commodi impedit ad enim aspernatur. Illo maxime laboriosam ipsam temporibus iusto quae laboriosam dolorem debitis.',
      },
    ],
  };
  render() {
    const { author, title, body, created_at, votes } = this.state.article;
    const { comments } = this.state;
    return (
      <div className="article-and-comments">
        <div className="Article">
          <div className="article-votes">{votes}</div>
          <div className="article-title">{title}</div>
          <div className="article-author-time">
            By {author} on {created_at}
          </div>
          <div className="article-body">
            <p>{body}</p>
          </div>
        </div>
        <h2>Comments:</h2>
        {comments.map(comment => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })}
      </div>
    );
  }
}

export default Article;
