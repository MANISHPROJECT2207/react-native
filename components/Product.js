import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Product = ({ product, setCart, addToWishlist, quantity, onIncrease, onDecrease,press }) => {
  return (
    <View style={styles.productCard}>
      <TouchableOpacity style={styles.position} onPress={addToWishlist}>
          {
            (product.wish == false) ? 
            <View>
              
              <Icon name="bookmark-add" size={40} color="black" />
            </View>
            :
            <View>
              <Icon name="bookmark-added" size={40} color="black" />

            </View>
          }
                
                
      </TouchableOpacity>
      
      <Image
        source={{ uri: `https:${product.imageUrl}` }} 
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      

      {/* Add to Cart Button */}
      {quantity > 0 && (
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={onDecrease}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={onIncrease}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add to Cart Button */}
      {quantity === 0 && (
        <TouchableOpacity style={styles.addToCartButton} onPress={
        () => (setCart(product),press({message:`${product.name} added to the cart!`}))
        }>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      )}

     
      
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#FF9900',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
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
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex:1,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
     
  }
});

export default Product;
