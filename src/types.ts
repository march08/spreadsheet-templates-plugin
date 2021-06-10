export type Category = { slug: string; name: string };

export type CategoryItemData = {
  categoryOrder: string;
  description: string;
  featuredOrder: string;
  imgUrl: string;
  name: string;
  primaryCategory: string;
  primarySlug: string;
  slug: string;
  secondaryCategories: Category[];
};

export type CategoryItemsByPrimaryCategory = {
  slug: string;
  name: string;
  data: CategoryItemData[];
}[];

export type Categories = Category[];
