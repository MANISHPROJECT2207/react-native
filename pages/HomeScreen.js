import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import contentfulClient from '../ContentfulClient';
import Product from '../components/Product';
import {
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
content_types = ['pageLanding', 'pageProduct']

const HomeScreen = ({ navigation }) => {
  

 
  const categories = [
    'Electronics',
    'Fashion',
    'Home',
    'Beauty',
    'Books',
    'Toys',
    'Sports',
    'Groceries',
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Logo */}
        <TouchableOpacity>
          <Image
            source={{
              uri: '',
            }}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search for products"
            placeholderTextColor="#555"
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Cart Icon */}
        <TouchableOpacity>
          <Icon name="shopping-cart" size={28} color="#fff" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Category Menu */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryMenu}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.navbar}>
        <Text style={styles.logo}>NCOM</Text>
        <TouchableOpacity style={styles.optionsButton} onPress={() => alert('Options menu')}>
          <Text style={styles.optionsText}>•••</Text>
        </TouchableOpacity>
      </View>
        
      
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#0D98BA',
      paddingTop: 40, // For status bar (adjust as needed)
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#0D98BA',
    },
    logo: {
      width: 60,
      height: 30,
      resizeMode: 'contain',
    },
    searchBar: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 8,
      marginLeft:  -15,
      marginRight:20,
      alignItems: 'center',
      overflow: 'hidden',
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      color: '#000',
      fontSize: 16,
    },
    searchIcon: {
      backgroundColor: '#FF9900',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadge: {
      position: 'absolute',
      right: 0,
      top: -4,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    categoryMenu: {
      backgroundColor: '#37475A',
      paddingVertical: 10,
    },
    categoryButton: {
      backgroundColor: '#475A69',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      marginHorizontal: 5,
    },
    categoryText: {
      color: '#fff',
      fontSize: 14,
    },
  container: {
    padding: 5,
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  logo: {
    color: '#ffa',
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  optionsText: {
    color: '#fff',
    fontSize: 18,
  },
  
});

export default HomeScreen;