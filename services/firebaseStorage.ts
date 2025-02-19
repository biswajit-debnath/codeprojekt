import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

interface ImageCache {
  [key: string]: string;
}

class FirebaseImageService {
  private static cache: ImageCache = {};

  static async getImageURL(path: string): Promise<string> {
    // Check cache first
    if (this.cache[path]) {
      return this.cache[path];
    }

    try {
      const imageRef = ref(storage, path);
      const url = await getDownloadURL(imageRef);
      // Store in cache
      this.cache[path] = url;
      return url;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  }

  static preloadImages(paths: string[]): Promise<void[]> {
    return Promise.all(
      paths.map(async (path) => {
        try {
          await this.getImageURL(path);
        } catch (error) {
          console.error(`Error preloading image ${path}:`, error);
        }
      })
    );
  }
}

export default FirebaseImageService;