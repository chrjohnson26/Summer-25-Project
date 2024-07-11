// src/components/NewsFeed.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../redux/slices/newsSlice';
import Article from './Article';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.articles);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default NewsFeed;
