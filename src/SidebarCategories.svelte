<script lang="ts">
  import type { Categories } from './types';
  export let categories: Categories;
</script>

<div class="sidebar__categories w-dyn-list">
  <div role="list" class="w-dyn-items">
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
