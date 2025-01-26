import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Product from '../components/Product';

const WishlistScreen = ({ navigation,route }) => {
  const {wishlist,setWishlist,handleAddToCart,handleAddToWishlist}  = route.params
  
  const [dummywish,setdummywish] = useState([])
  
  useEffect(()=>{
    setdummywish(wishlist)
  },[])

  return (
    <ScrollView style={styles.container}>
      
      {dummywish.length > 0 ? (
        
          dummywish.map((product) => 
          ( <TouchableOpacity
            // onPress={() => navigation.navigate(product.name, { category: 'Kids' })}
            >
            <Product key={product.id} product={product} setCart={() => handleAddToCart(product)}  addToWishlist={() => {handleAddToWishlist(product)
            setdummywish((prewish) =>
              prewish.filter((item) => item.id !== product.id)
            );
            }
            }/>
          </TouchableOpacity>
          ))
  
      ) : (
        <Text style={styles.emptyMessage}>Your wishlist is empty!</Text>
      )}
       
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  productImage: {
    width: '100%',
    height: 150,
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
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default WishlistScreen;
