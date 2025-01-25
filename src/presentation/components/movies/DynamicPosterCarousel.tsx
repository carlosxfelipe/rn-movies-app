import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Movie} from '../../../core/entities/movie.entity';
import {MoviePoster} from './MoviePoster';

interface Props {
  movies: Movie[];
  height?: number;
}

export const DynamicPosterCarousel = ({height = 440, movies}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;
  const [_, setCurrentIndex] = useState(0);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const posterWidth = screenWidth * 0.7;
  const sideSpacing = (screenWidth - posterWidth) / 2;
  const gap = 16;

  const stopAutoplay = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay(); // Certifica-se de não duplicar o intervalo
    scrollInterval.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % movies.length;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * (posterWidth + gap),
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3000);
  }, [movies.length, posterWidth, gap, stopAutoplay]);

  useEffect(() => {
    if (movies.length > 0) {
      startAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [movies, startAutoplay, stopAutoplay]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Obtém a posição atual de scroll
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (posterWidth + gap)); // Calcula o índice atual
    setCurrentIndex(index); // Atualiza o estado com o novo índice
    startAutoplay(); // Reinicia o autoplay com base na nova posição
  };

  return (
    <View style={[styles.carouselContainer, {height}]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={posterWidth + gap}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: sideSpacing - gap / 2,
        }}
        onMomentumScrollEnd={handleScrollEnd}>
        {movies.map(movie => (
          <View
            key={movie.id}
            style={[
              styles.posterContainer,
              {width: posterWidth, marginHorizontal: gap / 2},
            ]}>
            <MoviePoster movie={movie} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
  },
  posterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
