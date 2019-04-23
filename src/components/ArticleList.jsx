import React, { Component } from 'react';
import ArticleSummary from './ArticleSummary';
import '../styles/ArticleList.css';

class ArticleList extends Component {
  state = {
    articles: [
      {
        author: 'weegembump',
        title: 'Seafood substitutions are increasing',
        article_id: 33,
        body:
          "'SEAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the report finds that one in five fish sold has been mislabelled. Although fish fraud is common early in the supply chain, most of it comes at the retail level. In 65% of cases, the motivation is economic—slippery restaurateurs frequently serve up cheaper fish than they advertise to cut costs. In America, Oceana has reported instances of tilapia being sold as the more expensive red snapper. Especially brazen fish criminals have invented new types of fish entirely. In Brazil, researchers were puzzled to find markets selling 'douradinha', ' non-existent species. Close inspection found that 60% of such fish were actually 'vulture' catfish, a relatively undesirable dish. Reports in America of catfish being substituted for more expensive fish date back to at least 2002; Oceana’s study suggests that the phenomenon is spreading.",
        topic: 'cooking',
        created_at: '2018-05-30T15:59:13.341Z',
        votes: 0,
        comment_count: '6',
      },
      {
        author: 'happyamy2016',
        title: 'High Altitude Cooking',
        article_id: 28,
        body:
          'Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.',
        topic: 'cooking',
        created_at: '2018-05-27T03:32:28.514Z',
        votes: 0,
        comment_count: '5',
      },
      {
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
      {
        author: 'weegembump',
        title:
          "What does Jose Mourinho's handwriting say about his personality?",
        article_id: 13,
        body:
          "Jose Mourinho was at The O2 on Sunday night to watch Dominic Thiem in action against Novak Djokovic. Thiem took the first set before Djokovic fought back to claim the victory, but Manchester United's manager was clearly impressed with the Austrian's performance.",
        topic: 'football',
        created_at: '2018-04-16T19:29:32.774Z',
        votes: 0,
        comment_count: '6',
      },
    ],
  };

  render() {
    const { articles } = this.state;
    return (
      <div className="ArticleList">
        {articles.map(article => (
          <ArticleSummary key={article.article_id} article={article} />
        ))}
      </div>
    );
  }
}

export default ArticleList;
