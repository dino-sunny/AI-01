import { Dress, Category } from './types';

export const ALL_CATEGORY: Category = "All";

export const INITIAL_CATEGORIES: Category[] = [
  ALL_CATEGORY,
  "Casual",
  "Formal",
  "Party",
  "Summer",
];

export const INITIAL_DRESSES: Dress[] = [
  {
    id: '1',
    name: 'Bohemian Summer Maxi',
    description: 'A light and airy maxi dress perfect for sunny days. Features a floral print and tiered skirt.',
    price: 79.99,
    imageUrl: 'https://picsum.photos/seed/dress1/600/800',
    category: "Summer",
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '2',
    name: 'Classic Linen Shirt Dress',
    description: 'Effortless and chic, this linen shirt dress is a versatile staple for any casual occasion.',
    price: 64.50,
    imageUrl: 'https://picsum.photos/seed/dress2/600/800',
    category: "Casual",
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '3',
    name: 'Elegant Satin Gown',
    description: 'A stunning floor-length satin gown with a cowl neck and a thigh-high slit. Perfect for black-tie events.',
    price: 189.00,
    imageUrl: 'https://picsum.photos/seed/dress3/600/800',
    category: "Formal",
    sizes: ['XS', 'S', 'M'],
  },
  {
    id: '4',
    name: 'Sequin Party Mini Dress',
    description: 'Shine all night in this dazzling sequin mini dress. Features long sleeves and a bodycon fit.',
    price: 120.00,
    imageUrl: 'https://picsum.photos/seed/dress4/600/800',
    category: "Party",
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '5',
    name: 'Floral Sundress',
    description: 'A sweet and playful sundress with a vibrant floral pattern and adjustable spaghetti straps.',
    price: 55.00,
    imageUrl: 'https://picsum.photos/seed/dress5/600/800',
    category: "Summer",
    sizes: ['XS', 'S', 'M', 'L'],
  },
   {
    id: '6',
    name: 'Denim Utility Dress',
    description: 'A cool and comfortable denim dress with a button-front design and large utility pockets.',
    price: 85.00,
    imageUrl: 'https://picsum.photos/seed/dress6/600/800',
    category: "Casual",
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '7',
    name: 'Velvet Evening Dress',
    description: 'A luxurious velvet dress with a flattering wrap design, perfect for formal dinners and galas.',
    price: 210.00,
    imageUrl: 'https://picsum.photos/seed/dress7/600/800',
    category: "Formal",
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: '8',
    name: 'Ruffled Cocktail Dress',
    description: 'Turn heads in this fun and flirty cocktail dress with asymmetric ruffles and a vibrant color.',
    price: 95.00,
    imageUrl: 'https://picsum.photos/seed/dress8/600/800',
    category: "Party",
    sizes: ['XS', 'S', 'M'],
  },
];
