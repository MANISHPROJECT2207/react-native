import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ route, navigation }) => {
    const [currcart,setcurrcart] = useState([])
    const {cart,setcart} = route.params
  // Load cart data from AsyncStorage on component mount
  // Save cart data to AsyncStorage whenever it changes
  useEffect(() => {
    const loadCart = async () => {
      try {
        setcurrcart(cart)
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };
    

    loadCart();
  },[]);
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(currcart));
        console.log(cart);
        
      } catch (error) {
        console.error('Error saving cart data:', error);
      }
    };
    setcart(currcart)
    saveCart();
  }, [currcart]);

  const handleIncreaseQuantity = (productId) => {
    setcurrcart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    let value = true;
    setcurrcart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : (item.id !== productId) 
          ? item
          : value
        
      
      )
    );

    setcurrcart((prevCart) =>
      prevCart.filter((item) => item !== value)
    );
  };

  const handleRemoveProduct = (productId) => {
    Alert.alert(
      'Remove Product',
      'Are you sure you want to remove this product from the cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setcurrcart((prevCart) =>
              prevCart.filter((item) => item.id !== productId)
            );
          },
        },
      ]
    );
  };

  const calculateTotal = () => {
    return currcart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cartList}>
        {currcart.length > 0 ? (
          currcart.map((item) => (
            <View style={styles.cartItem} key={item.id}>
              <Image
                source={{ uri: `https:${item.imageUrl}` }}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleDecreaseQuantity(item.id)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleIncreaseQuantity(item.id)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveProduct(item.id)}
              >
                <Icon name="delete" size={24} color="#FF0000" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty!</Text>
        )}
      </ScrollView>
      {currcart.length > 0 && (
        <View style={styles.cartSummary}>
          <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => Alert.alert('Checkout', 'Proceeding to checkout!')}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  cartList: {
    padding: 10,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FF9900',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
  },
  cartSummary: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#FF9900',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});

export default Cart;
