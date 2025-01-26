import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Show= ({startTime,price}) => {
    const [timeLeft, setTimeLeft] = useState((300-((Date.now()-startTime)/1000)).toFixed(0));
      
        useEffect(() => {
          // exit early when we reach 0
          if (timeLeft === 0) return;
      
          // save intervalId to clear the interval when the
          // component re-renders
          const intervalId = setInterval(() => {
            setTimeLeft((prevtime)=>prevtime-1);
          }, 1000);
      
          // clear interval on re-render to avoid memory leaks
          return () => clearInterval(intervalId);
          // add timeLeft as a dependency to re-rerun the effect
          // when we update it
        }, [timeLeft]);
    return (
        <View>
            {
                (timeLeft > 0) ?
                <View>
                    
                    <View style={styles.container}>
      <Text style={styles.productP}>${price}</Text>
      <Text style={styles.productPrice}> ${price*90/100}</Text>
    </View>
                <Text style={styles.productPrice}>10% Discount  Time Left:{timeLeft} Sec</Text>
                </View>
                :
                <Text style={styles.productPrice}>${price}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically
      },
    productPrice: {
        fontSize: 14,
        color: 'green',
        marginVertical: 5,
      },
      productP: {
        textDecorationLine: 'line-through',
        fontSize: 14,
        color: 'red',
        marginVertical: 5,
      },
})

export default Show
