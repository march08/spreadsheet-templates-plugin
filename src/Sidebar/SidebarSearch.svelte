<script lang="ts">
  import { searchKeyword } from '../store';

  let searchValue: string;

  searchKeyword.subscribe((value) => {
    searchValue = value;
  });
</script>

<div class="sidebar__form w-form">
  <div class="sidebar__form-wrap">
    <input
      type="text"
      class="sidebar__input w-input"
      maxlength="256"
      placeholder="Search"
      on:input={(event) => {
        searchKeyword.set(event.currentTarget.value);
      }}
    />
    <span class="sidebar__submit w-inline-block"
      ><img
        src="https://assets.website-files.com/60188e265d13c5a7c8f7998b/6037ba867f12403823977c18_search-icon.svg"
        loading="lazy"
        alt=""
      />
    </span>
  </div>
</div>
