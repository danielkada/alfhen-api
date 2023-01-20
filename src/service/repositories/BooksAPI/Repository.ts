import axios from 'axios';

interface APIBookGoogleFindProps {
  path: string;
}

class APIBookGoogle {
  readonly baseURL: string;

  constructor() {
    this.baseURL = 'https://www.googleapis.com/books/v1/volumes';
  }

  async find({ path }: APIBookGoogleFindProps) {
    try {
      const { data } = await axios.get(`${this.baseURL}${path}`);

      return data;
    } catch {
      return null;
    }
  }
}

export default new APIBookGoogle();
