import type { Product, Message } from './types';

export const initialProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    description: 'A beautifully preserved vintage leather jacket from the 80s. Perfect for a stylish, retro look. Made from 100% genuine leather, it features classic zippers and a comfortable inner lining. Has some minor wear which adds to its character.',
    price: 150,
    category: 'Apparel',
    imageUrl: 'https://picsum.photos/seed/1/600/800',
    imageHint: 'leather jacket',
    seller: {
      id: 'seller1',
      name: 'Jane Doe',
      avatarUrl: 'https://picsum.photos/seed/seller1/100/100',
    },
  },
  {
    id: '2',
    title: 'Hand-painted Ceramic Mug',
    description: 'Unique, hand-painted ceramic mug. Each mug is a one-of-a-kind piece of art, perfect for your morning coffee or tea. Dishwasher and microwave safe. Holds 12oz of your favorite beverage.',
    price: 25,
    category: 'Home Goods',
    imageUrl: 'https://picsum.photos/seed/2/600/600',
    imageHint: 'ceramic mug',
    seller: {
      id: 'seller2',
      name: 'John Smith',
      avatarUrl: 'https://picsum.photos/seed/seller2/100/100',
    },
  },
  {
    id: '3',
    title: 'Modern Bookshelf',
    description: 'A sleek and modern bookshelf with a minimalist design. Made from sustainable bamboo, it offers five spacious shelves to display your books and decor. Easy to assemble.',
    price: 220,
    category: 'Furniture',
    imageUrl: 'https://picsum.photos/seed/3/600/700',
    imageHint: 'modern bookshelf',
    seller: {
      id: 'seller1',
      name: 'Jane Doe',
      avatarUrl: 'https://picsum.photos/seed/seller1/100/100',
    },
  },
  {
    id: '4',
    title: 'Retro Polaroid Camera',
    description: 'Capture memories in an instant with this fully functional retro Polaroid 600 camera. It has been tested and works perfectly. A great item for photography enthusiasts and collectors. Film not included.',
    price: 95,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/seed/4/600/600',
    imageHint: 'retro camera',
    seller: {
      id: 'seller2',
      name: 'John Smith',
      avatarUrl: 'https://picsum.photos/seed/seller2/100/100',
    },
  },
  {
    id: '5',
    title: 'Artisan Scented Candle',
    description: 'A hand-poured soy wax candle with a lavender and chamomile scent. Perfect for relaxation and creating a cozy atmosphere. Burn time is approximately 40 hours. Comes in a beautiful amber glass jar.',
    price: 18,
    category: 'Home Goods',
    imageUrl: 'https://picsum.photos/seed/5/600/600',
    imageHint: 'scented candle',
    seller: {
      id: 'seller1',
      name: 'Jane Doe',
      avatarUrl: 'https://picsum.photos/seed/seller1/100/100',
    },
  },
  {
    id: '6',
    title: 'Wireless Headphones',
    description: 'High-fidelity wireless over-ear headphones with active noise cancellation. Enjoy up to 30 hours of playtime on a single charge. Features plush earcups for maximum comfort. Comes with a carrying case and charging cable.',
    price: 120,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/seed/6/600/600',
    imageHint: 'wireless headphones',
    seller: {
      id: 'seller2',
      name: 'John Smith',
      avatarUrl: 'https://picsum.photos/seed/seller2/100/100',
    },
  },
];

export const productCategories = [
    "Apparel",
    "Home Goods",
    "Furniture",
    "Electronics",
    "Collectibles",
    "Books",
    "Other"
];


export const mockChatMessages: Message[] = [
    {
        id: 'msg1',
        text: "Hi, is this still available?",
        sender: 'user',
        timestamp: '10:30 AM'
    },
    {
        id: 'msg2',
        text: "Hello! Yes, the leather jacket is still available.",
        sender: 'seller',
        timestamp: '10:31 AM'
    },
    {
        id: 'msg3',
        text: "Great! Could you tell me more about the condition?",
        sender: 'user',
        timestamp: '10:32 AM'
    },
    {
        id: 'msg4',
        text: "It's in excellent vintage condition. There's some minor, natural wear on the cuffs, but no major tears or stains. I've added a few more pictures to the listing if you want to take a closer look.",
        sender: 'seller',
        timestamp: '10:35 AM'
    },
    {
        id: 'msg5',
        text: "Perfect, thanks! I'll take it.",
        sender: 'user',
        timestamp: '10:40 AM'
    }
]
