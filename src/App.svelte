<script lang="ts">
  import type {
    CategoryItemData,
    CategoryItemsByPrimaryCategory,
  } from './types';

  export let items: CategoryItemData[];
  export let isFeaturedList: boolean;
  export let activeCategory: string | null;
  export let categories: CategoryItemsByPrimaryCategory;
  import { searchKeyword } from './store';
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
        console.log(item.slug, activeCategory, item.slug === activeCategory);
        return item.slug === activeCategory;
      })
    : null;

  const featuredTemplates = items
    .filter((item) => !!item.featuredOrder)
    .sort((a, b) => Number(a.featuredOrder) - Number(b.featuredOrder));
  console.log(featuredTemplates);
</script>

{#if isSearching}
  <div class="templates__headline-wrap">
    <div class="h6">Search result</div>
  </div>
  <CategoryList limit={null} data={filteredItemsByKeyword} />
{:else if isFeaturedList}
  <div class="templates__headline-wrap">
    <div class="h6">Featured templates</div>
  </div>
  <CategoryList limit={null} data={featuredTemplates} />
{:else if activeCategoryData}
  <div class="templates__headline-wrap">
    <div class="h6">{activeCategoryData.name}</div>
  </div>
  <CategoryList limit={null} data={activeCategoryData.data} />
{:else}
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
