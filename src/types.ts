export const MVP_CATEGORIES = [
  'Tops',
  'Bottoms',
  'Dresses',
  'Shoes',
  'Sleepwear',
  'Jackets',
  'Coats',
  'Sweaters',
  'Skirts',
] as const;

export const STYLE_TAGS = [
  'Athletic',
  'Formal',
  'Business professional',
  'Casual',
  'Streetwear',
  'Sleepwear',
] as const;

export type Category = (typeof MVP_CATEGORIES)[number];
export type StyleTag = (typeof STYLE_TAGS)[number];

export type WardrobeItem = {
  id: string;
  name: string;
  category: Category;
  styleTags: StyleTag[];
  imageUri?: string;
  createdAt: string;
};
