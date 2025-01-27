import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert, // Import StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import contentfulClient from '../ContentfulClient';
import Product from '../components/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from "toastify-react-native";

const HomeScreen = ({ route,navigation }) => {

    // const [timeLeft, setTimeLeft] = useState(300);
    const showToasts = ({message=""}) => {
      Toast.success(message);
    };
    
    
  
   

  const categories = [
    'cloth',
    'shoe',
    'Electronics',
    'Toys',
    'Fashion',
    'Home',
    'Beauty',
    'Books',
    'Sports',
    'Groceries',
  ];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setcart] = useState([]);
  let counter = 0;

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setcart(JSON.parse(savedCart));
        } else if (route.params.cart) {
          setcart(route.params.cart);
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };
    

    loadCart();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: content_types[1],
        });
        // console.log('response:', response.includes.Entry[counter]);

        if (response.items.length > 0) {
          // const resolvedProducts = response.includes.Entry.map((item) => {
          //   let fields = item.Entry[counter].fields;

          //   const imageUrl =
          //     response.includes.Entry[counter++].fields?.shareImages[1].fields?.file?.url || '';

          //   return {
          //     id: item.sys.id,
          //     name: fields.name || 'No Name',
          //     price: fields.price || 'N/A',
          //     imageUrl: imageUrl || '',
          //   };
          // });

          let resolvedProducts = [];

          while(counter < response.items.length){
            resolvedProducts[counter] = {
              id: counter,
              category: response.items[counter].fields.category,
              root:response.items[counter].fields.root,
              name: response.items[counter].fields.internalName,
              price: response.items[counter].fields.price,
              imageUrl: response.items[counter].fields.featuredProductImage.fields.file.url,
              description: response.items[counter].fields.description,
              wish:false
            };
            counter++;
          }

          setProducts(resolvedProducts);
          setFilteredData(resolvedProducts);
        } else {
          console.warn('No products found for the given content type.');
        }
      } catch (error) {
        console.error('Error fetching data from Contentful:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredData, setFilteredData] = useState(''); // State for filtered data
  const handleAddToCart = async (product) => {
    console.log("hello");
    
    let flag = true
    
    cart.map(async (item)=>{
      if(item.id == product.id){
        setcart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        flag = false
        
       
        try {
          await AsyncStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
          console.error('Error saving cart data:', error);
        }
        console.log(cart);
        
        return;
      }
    })
    if(flag == true){
    
    setcart((prevCart) => [...prevCart, {...product,quantity : 1,startTime : Date.now()}]); // Add product to cart
    console.log(cart);
    
    
        try {
          await AsyncStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
          console.error('Error saving cart data:', error);
        }
      }
  };
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredData(products); // Show all data if the input is empty
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };


  const [wishlist, setWishlist] = useState([]); // New wishlist state
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const savedWishlist = await AsyncStorage.getItem('wishlist');
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error('Error loading wishlist data:', error);
      }
    };

    loadWishlist();
  }, []);

  const handleAddToWishlist = async (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== product.id));
      setFilteredData((prevWishlist) => prevWishlist.map((item)=>(item.id === product.id) ? {...item,wish : false}:item))
      
      showToasts({message:`${product.name} removed from the Wishlist!`})
      return;
    }

    setWishlist((prevWishlist) => [...prevWishlist, product]);
    setFilteredData((prevWishlist) => prevWishlist.map((item)=>(item.id === product.id) ? {...item,wish : true}:item))
      
    showToasts({message:`${product.name} added to the Wishlist!`})

    try {
      await AsyncStorage.setItem('wishlist', JSON.stringify([...wishlist, product]));
      // setFilteredData((prevWishlist)=>[...prevWishlist,product])
      
    } catch (error) {
      console.error('Error saving wishlist data:', error);
    }
  };
  const handleIncreaseQuantity = (productId) => {
    setcart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setcart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove products with 0 quantity
    );
  };
  return (
    <View style={styles.container}>
      <ToastManager width={330} height={100}/>
      {/* Status Bar */}
      <StatusBar backgroundColor="#0D98BA" barStyle="light-content" />

      {/* Top Navbar */}
      <View style={styles.header}>
        {/* Logo */}
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://commons.wikimedia.org/wiki/File:Amazon_logo.svg',
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
          value={searchQuery}
          onChangeText={handleSearch} // Trigger search logic on input change
        />
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Cart Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart,setcart })}>
          <Icon name="shopping-cart" size={28} color="#fff" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cart.length}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Wishlist', { wishlist,setWishlist,handleAddToCart,handleAddToWishlist})}>
          <Icon name="bookmark-added" size={30} color="#fff" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{wishlist.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Category Menu */}
      <View>
       <ScrollView>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryMenu}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton} onPress={() => navigation.navigate('Category', { category: category,data:products.filter((item) => item.root == category)})}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
        </ScrollView> 
      
      
      </View>
      

      <ScrollView contentContainerStyle={styles.categorySection}>
              <Text style={styles.sectionTitle}>Shop by Category</Text>
      
              <View style={styles.categoryRow}>
                <TouchableOpacity
                  style={styles.categoryCard}
                  onPress={() => navigation.navigate('Category', { category: 'Men',data:products.filter((item) => item.category == 'men')})}
                >
                  <Text style={styles.categoryTex}>Men's</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryCard}
                  onPress={() => navigation.navigate('Category', { category: 'Women',data:products.filter((item) => item.category == 'women')})}
                 >
                  <Text style={styles.categoryTex}>Women's</Text>
                </TouchableOpacity>
              </View>
      
              <View style={styles.categoryRow}>
                <TouchableOpacity
                  style={styles.categoryCard}
                  onPress={() => navigation.navigate('Category', { category: 'Kids',data:products.filter((item) => item.category == 'kids')})}
                  >
                  <Text style={styles.categoryTex}>Kids</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryCard}
                  onPress={() => navigation.navigate('Category', { category: 'Accessories',data:products.filter((item) => item.category == 'accessories')})}
                >
                  <Text style={styles.categoryTex}>Accessories</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              {filteredData.length > 0 ? (
        filteredData.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <TouchableOpacity onPress={() => navigation.navigate('SingleProduct', {product,handleAddToCart,handleAddToWishlist})}>
              <Product
              key={product.id}
              product={product}
              setCart={() => handleAddToCart(product)}
              addToWishlist={() => handleAddToWishlist(product)}
              quantity={quantity}
              press = {showToasts}
              onIncrease={() => handleIncreaseQuantity(product.id)}
              onDecrease={() => handleDecreaseQuantity(product.id)}
            />
            </TouchableOpacity>
            
          );
        })
      ) : (
        <Text>No products found</Text>
      )}
        
              
            </ScrollView>
        {
          (true) ? 
          <View style={styles.stickyFooter}>
          <Text style={styles.footerText}>You will Get 10% Discount if you Add any Product in Cart and purchase Within 5 Minute.</Text>
          {/* <Text style={styles.footerText}>Time Left: {timeLeft}</Text> */}
        </View>
          :
          
          ""
         
        }
            
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D98BA',
    flex: 1,
    paddingTop: 0, // No padding needed as StatusBar is styled
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
    marginLeft: -15,
    marginRight: 20,
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
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#37475A',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
    maxHeight:80,
  },
  categoryButton: {
    backgroundColor: '#475A69',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 5,
    
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  categorySection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoryTex: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryCard: {
    backgroundColor: '#f8f8f8',
    width: '48%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default HomeScreen;
