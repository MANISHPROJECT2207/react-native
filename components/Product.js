import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Product = ({ product,setcart }) => {
  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: `https:${product.imageUrl}` }} // Prefix with `https:`
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={setcart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },addToCartButton: {
    backgroundColor: '#FF9900',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Product;