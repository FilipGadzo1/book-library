export interface BookResponse {
  items: BookObject[];
  kind: string;
  totalItems: number;
}

export interface BookObject {
  id: string;
  volumeInfo: VolumeInfo;
  quantity: number;
  price: number;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  description: string;
  printType: string;
  rating: number;
  imageLinks: ImageLinks;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
}

export type EmailTemplate = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  address: string | undefined;
  city: string | undefined;
  zip: string | undefined;
  price: number;
  orderNumber: number;
};
