import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const CategoryPage = ({ route }) => {
  const { category, data,product, setCart, addToWishlist, quantity, onIncrease, onDecrease,press } = route.params;
  
   console.log(data);
   
  // Function to render each product item
  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: `https:${item.imageUrl}`}} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category}</Text>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display two items per row
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  list: {
    paddingBottom: 10,
  },
  productContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: width / 2.5,
    height: width / 2.5,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default CategoryPage;
