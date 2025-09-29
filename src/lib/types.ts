export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageHint: string;
  seller: {
    id: string;
    name: string;
    avatarUrl: string;
  };
};

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'seller';
  timestamp: string;
};
