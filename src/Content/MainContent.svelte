<script lang="ts">
  import type {
    CategoryItemData,
    CategoryItemsByPrimaryCategory,
  } from '../types';

  export let items: CategoryItemData[];
  export let isFeaturedList: boolean;
  export let activeCategory: string | null;
  export let categories: CategoryItemsByPrimaryCategory;
  import { searchKeyword } from '../store';
  import CategoryList from './CategoryList.svelte';

  let searchValue: string;

  searchKeyword.subscribe((value) => {
    searchValue = value;
  });

  $: filteredItemsByKeyword = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  $: isSearching = searchValue.length > 0;

  $: activeCategoryData = activeCategory
    ? categories.find((item) => {
        return item.slug === activeCategory;
      })
    : null;

  const featuredTemplates = items
    .filter((item) => !!item.featuredOrder)
    .sort((a, b) => Number(a.featuredOrder) - Number(b.featuredOrder));

  /**
   * hiding featured categories
   */
  $: {
    try {
      const thisContentEl = document.getElementById('ss-content');
      if (thisContentEl) {
        const prevSibling = thisContentEl.previousElementSibling;
        if (prevSibling && isSearching) {
          (prevSibling as HTMLElement).style.display = 'none';
        } else if (prevSibling && !isSearching) {
          (prevSibling as HTMLElement).style.display = 'block';
        }
      }
    } catch {}
  }
</script>

{#if isSearching}
  <div class="templates__headline-wrap">
    <div class="h6">Search result</div>
    <a href={`/templates`} class="explore-link w-inline-block">
      <div>Back to all templates →</div>
    </a>
  </div>
  <CategoryList limit={null} data={filteredItemsByKeyword} />
{:else if isFeaturedList}
  <div class="templates__headline-wrap">
    <div class="h6">Featured Templates</div>
  </div>
  <CategoryList limit={null} data={featuredTemplates} />
{:else if activeCategoryData}
  <div class="templates__headline-wrap">
    <div class="h6">{activeCategoryData.name}</div>
  </div>
  <CategoryList limit={null} data={activeCategoryData.data} />
{:else}
  <div class="templates__headline-wrap">
    <div class="h6">Featured Templates</div>
    <a href={`/templates-featured`} class="explore-link w-inline-block">
      <div>Explore all featured templates →</div>
    </a>
  </div>
  <CategoryList id="temp-featured" limit={6} data={featuredTemplates} />
  {#each categories as category}
    <div class="templates__headline-wrap">
      <div class="h6">{category.name}</div>
      {#if category.data.length > 3}
        <a
          href={`/category/${category.slug}`}
          class="explore-link w-inline-block"
        >
          <div>Explore all →</div>
        </a>
      {/if}
    </div>
    <CategoryList limit={3} data={category.data} />
  {/each}
{/if}
