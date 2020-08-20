import React, { useState, useEffect }  from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByRating = (rating) => {
    return results.filter(result => {
      return result.rating === rating;
    });
  };

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList results={filterResultsByRating(5)} title="5 Star" />
        <ResultsList results={filterResultsByRating(4.5)} title="4.5 Star" />
        <ResultsList results={filterResultsByRating(4)} title="4 Star" />
        <ResultsList results={filterResultsByRating(3.5)} title="3.5 Star" />
        <ResultsList results={filterResultsByRating(3)} title="3 Star" />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen