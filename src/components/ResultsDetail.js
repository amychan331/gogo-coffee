import React, { useState }  from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ResultsDetail = ({ result }) => {
  let distance = Math.ceil(result.distance);
  let result_url = result.image_url;
  return (
    <View style={styles.container}>
      { result_url ? <Image style={styles.image} source={{ uri:result_url }} /> : <Image style={styles.image} /> }
      <Text style={styles.name}>{result.name}</Text>
      <Text>Distance: {distance}m</Text>
      <Text>{result.rating} Stars, {result.review_count} Reviews</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 10,
    marginBottom: 5
  },
  name: {
    fontWeight: 'bold'
  }
});

export default ResultsDetail;