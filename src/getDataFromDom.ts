import type { CategoryItemData } from './types';

const templates: CategoryItemData[] = Array.from(
  document.getElementsByClassName('embed_collection_item')
).map((item) => {
  const arrayOfProperties = Array.from(item.children).map((child) => {
    const id = child.getAttribute('data-property');
    return id.split(/:(.+)/);
  });

  const nextSibling = item.nextElementSibling;
  let secondaryCategories: { name: string; slug: string }[] = [];

  if (nextSibling) {
    const categories = Array.from(nextSibling.querySelectorAll('em')).map(
      (item) => ({
        slug: item.getAttribute('data-slug'),
        name: item.getAttribute('data-name'),
      })
    );
    secondaryCategories = categories;
  }

  const result = arrayOfProperties.reduce(
    (res, next) => {
      return {
        ...res,
        [next[0]]: next[1],
      };
    },
    { secondaryCategories }
  ) as CategoryItemData;

  return result;
});

const categories = Object.entries(
  templates.reduce((res, next) => {
    const secondary = next.secondaryCategories.reduce((r, cat) => {
      return {
        ...r,
        [cat.slug]: cat.name,
      };
    }, {});

    return {
      ...res,
      [next.primarySlug]: next.primaryCategory,
      ...secondary,
    };
  }, {})
)
  .map(([key, value]: [string, string]) => ({
    slug: key,
    name: value,
  }))
  .sort((a, b) => {
    return a.name.localeCompare(b.name);
  })
  // add all templates as data
  .map((category) => {
    // category items
    const data: CategoryItemData[] = templates
      .filter((template) => {
        if (template.primarySlug === category.slug) {
          return true;
        }
        // has this category as a secondary category
        if (
          template.secondaryCategories.find((cat) => cat.slug === category.slug)
        ) {
          return true;
        }

        return false;
      })
      .sort((a, b) => {
        const aOrder =
          a.primaryCategory === category.name
            ? Number(a.categoryOrder)
            : Number(a.categoryOrder) + 10000;
        const bOrder =
          b.primaryCategory === category.name
            ? Number(b.categoryOrder)
            : Number(b.categoryOrder) + 10000;
        return aOrder - bOrder;
      });

    return {
      ...category,
      data,
    };
  });

export { templates as items, categories };
