import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Product = ({ product, setCart, addToWishlist }) => {
  return (
    <View style={styles.productCard}>
      <TouchableOpacity style={styles.position} onPress={addToWishlist}>
                <Icon name="bookmark-add" size={40} color="black" />
                
      </TouchableOpacity>
      
      <Image
        source={{ uri: `https:${product.imageUrl}` }} 
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={setCart}>
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
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems:'center',
    marginInline:60,
    marginTop:10
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addToWishlistButton: {
    backgroundColor: '#FF6347', // Tomato color for wishlist button
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  addToWishlistText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  position:{
    paddingLeft:275, 
  }
});

export default Product;
