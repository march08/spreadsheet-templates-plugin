import App from './App.svelte';
import { items, categories } from './getDataFromDom';
import Searchbar from './Searchbar.svelte';

const getActiveCategoryFromUrl = () => {
  const pathname = window.location.pathname;
  if (pathname.startsWith('/category/')) {
    return pathname.replace('/category/', '').split('/')[0];
  }
  return null;
};

const getIsFeaturedList = () => {
  const pathname = window.location.pathname;
  return pathname === '/templates-featured';
};

// on page load, this gets populated
const activeCategory = getActiveCategoryFromUrl();
const isFeaturedList = getIsFeaturedList();

var app = new App({
  target: document.getElementById('ss-content'),
  props: {
    items,
    activeCategory,
    isFeaturedList,
    categories,
  },
});

new Searchbar({
  target: document.getElementById('ss-search'),
  props: {
    categories,
  },
});

export default app;
