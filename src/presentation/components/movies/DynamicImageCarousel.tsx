import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  Image,
  Pressable,
} from 'react-native';

interface ImageData {
  id: string | number;
  uri: string;
}

interface Props {
  images: ImageData[];
  height?: number;
  onPressImage?: (id: string | number) => void;
  showIndicators?: boolean;
  indicatorColor?: string;
}

export const DynamicImageCarousel = ({
  height = 180,
  images,
  onPressImage,
  showIndicators = false,
  indicatorColor = '#000',
}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const imageWidth = screenWidth * 0.7;
  const sideSpacing = (screenWidth - imageWidth) / 2;
  const gap = Platform.OS === 'android' ? 48 : 16;
  const carouselEdgePadding = sideSpacing - gap / 2;

  const stopAutoplay = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    scrollInterval.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % images.length;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * (imageWidth + gap),
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3000);
  }, [images.length, imageWidth, gap, stopAutoplay]);

  useEffect(() => {
    if (images.length > 0) {
      startAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [images, startAutoplay, stopAutoplay]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (imageWidth + gap));
    setCurrentIndex(index);
    startAutoplay();
  };

  return (
    <View style={[styles.carouselContainer, {height}]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={imageWidth + gap}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: carouselEdgePadding,
        }}
        onMomentumScrollEnd={handleScrollEnd}>
        {images.map(image => (
          <Pressable
            key={image.id}
            onPress={() => onPressImage?.(image.id)}
            style={[
              styles.imageContainer,
              {width: imageWidth, marginHorizontal: gap / 2},
            ]}>
            <Image
              style={[styles.image, {width: imageWidth, height}]}
              source={{uri: image.uri}}
            />
          </Pressable>
        ))}
      </ScrollView>

      {showIndicators && (
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && {
                  ...styles.activeIndicator,
                  backgroundColor: indicatorColor,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#000',
    transform: [{scale: 1.2}],
  },
});
