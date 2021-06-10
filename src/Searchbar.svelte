<script lang="ts">
  import { searchKeyword } from './store';
  import type { Categories } from './types';
  export let categories: Categories;

  let searchValue: string;

  searchKeyword.subscribe((value) => {
    searchValue = value;
  });
</script>

<div>
  <input
    type="input"
    class="sidebar__input w-input"
    placeholder="Search"
    on:input={(event) => {
      searchKeyword.set(event.currentTarget.value);
    }}
  />
</div>
<br />
<div class="sidebar__categories w-dyn-list">
  <div role="list" class="w-dyn-items">
    <div role="listitem" class="sidebar__item w-dyn-item">
      <a href={`/templates`} class="link-small category-dropdown-link">
        All Templates
      </a>
    </div>
    <div role="listitem" class="sidebar__item w-dyn-item">
      <a href={`/templates-featured`} class="link-small category-dropdown-link">
        Featured Tempaltes
      </a>
    </div>
    <div class="sidebar__divider" />
    {#each categories as category}
      <div role="listitem" class="sidebar__item w-dyn-item">
        <a
          href={`/category/${category.slug}`}
          class="link-small category-dropdown-link"
        >
          {category.name}
        </a>
      </div>
    {/each}
  </div>
</div>
