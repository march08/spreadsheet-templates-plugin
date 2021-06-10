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
    <div style="opacity: 0" class="temp__desc">
      <div class="template-desc">
        {data.description}
      </div>
    </div>
  </a>
  <a href={`/template/${data.slug}`} class="template__label">{data.name}</a>
  <div class="temp__desc mobile">
    <div class="template-desc">
      Use this spreadsheet to create an amortization schedule for a fixed-rate
      loan. Edit the cells within the blue cell borders (Loan Amount, Term,
      Interest Rate, etc.). You can also enter optional extra payments within
      the table to estimate the interest savings.
    </div>
  </div>
</div>
