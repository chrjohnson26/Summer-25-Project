// src/components/__tests__/NewsFeed.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NewsFeed from '../NewsFeed';

const mockStore = configureStore([]);

test('renders NewsFeed', () => {
  const store = mockStore({
    news: { articles: [] },
  });

  const { getByText } = render(
    <Provider store={store}>
      <NewsFeed />
    </Provider>
  );

  expect(getByText(/No news available/i)).toBeInTheDocument();
});
