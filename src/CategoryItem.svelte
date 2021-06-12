<script lang="ts">
  import type { CategoryItemData } from './types';

  export let data: CategoryItemData;
</script>

<div role="listitem" class="home__template w-dyn-item">
  <a
    data-w-id="a9327e93-7efd-87e0-0692-2dfef0ff007b"
    href={`/template/${data.slug}`}
    class="temp__thumbnail w-inline-block"
  >
    <img
      src={data.imgUrl}
      loading="lazy"
      alt={data.name}
      class="template-image"
    />
    <div class="temp__desc">
      <div class="template-desc">
        {data.description}
      </div>
    </div>
  </a>
  <a href={`/template/${data.slug}`} class="template__label">{data.name}</a>
  <div class="temp__desc mobile">
    <div class="template-desc">
      {data.description}
    </div>
  </div>
</div>

<style>
  .temp__thumbnail .temp__desc {
    opacity: 0;
    transition: 0.1s all;
  }
  @media screen and (min-width: 768px) {
    .home__template:hover .temp__thumbnail .temp__desc {
      opacity: 1;
    }
  }
</style>
