<script lang="ts">
  import type { CategoryItemData } from './types';
  import CategoryItem from './CategoryItem.svelte';
  import ListEmptyState from './ListEmptyState.svelte';

  export let data: CategoryItemData[];
  export let limit: number | null;
  $: items = !!limit ? data.slice(0, limit) : data;
</script>

{#if items.length > 0}
  <div role="list" class="templates__grid w-dyn-items">
    {#each items as item}
      <CategoryItem data={item} />
    {/each}
  </div>
{:else}
  <ListEmptyState />
{/if}
