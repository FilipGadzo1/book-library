import type { BookResponse } from './types';

const apiUrl = import.meta.env.VITE_API_URL;

class AppService {
  async getBooks(query: string): Promise<BookResponse> {
    const response = await fetch(`${apiUrl}?q=${query}&maxResults=40`).then((res) => res.json());

    return !response.items ? Promise.resolve<BookResponse>({ items: [], kind: '', totalItems: 0 }) : response;
  }
}

export const service = new AppService();
