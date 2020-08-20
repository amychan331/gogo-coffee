import axois from 'axios';
import { YELP_KEY } from 'react-native-dotenv';
ApiClient.init(YELP_KEY);

export default axois.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: `Bearer ${YELP_KEY}`
  }
});