import HomeStore from './stores/home';
import SearchStore from './stores/search';
import FavoriteStore from './stores/favorites';
import GiphyService from './services/giphy';

import { SEARCH_LIMIT } from './constants';

async function search(query) {
  SearchStore.getInstance().setLoadingState(true, true);
  SearchStore.getInstance().lastQuery = query;
  const offset = 0;
  const res = await GiphyService.search(query, offset, SEARCH_LIMIT);
  SearchStore.getInstance().receiveResults(res)
  HomeStore.getInstance().replace(res);
}

async function loadMore() {
  SearchStore.getInstance().setLoadingState(true, false);
  const offset = HomeStore.getInstance().pagination.offset + SEARCH_LIMIT;
  const res = await GiphyService.search(SearchStore.getInstance().lastQuery, offset, SEARCH_LIMIT);
  HomeStore.getInstance().add(res);
}

const toggleFavorite = (item) => FavoriteStore.getInstance().addOrRemove(item);

export default {
  search,
  loadMore,
  toggleFavorite,
}
