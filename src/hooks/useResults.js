import { useState, useEffect }  from 'react';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import yelp from '../api/yelp';

export default () => {
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const startWatching = async () => {
    try {
      let { status } = await requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
      }

      let location = await getCurrentPositionAsync({});
      setLocation(location);
      searchApi();
    } catch (e) {
      setErrorMessage(e);
    }
  }

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          categories: 'coffee',
          term: searchTerm,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          open_now: true,
          transactions: ['pickup']
        }
      });
      setResults(response.data.businesses);
      setErrorMessage(null);
    } catch (err) {
      console.log(err);
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    let mounted = true;
    if (location.coords === null) {
      startWatching();
    } else {
      searchApi();
      return () => mounted = false;
    }
  }, []);

  return [searchApi, results, errorMessage];
};