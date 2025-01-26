import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

const ZoomableImageScreen = ({ route }) => {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <ReactNativeZoomableView
        maxZoom={30}
        contentWidth={400}
        contentHeight={400}
        style={styles.zoomableView}
      >
        <Image
          style={styles.image}
          source={{ uri: `https:${imageUrl}` }}
          resizeMode="contain"
        />
      </ReactNativeZoomableView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  zoomableView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ZoomableImageScreen;
