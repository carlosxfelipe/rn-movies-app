import React, {useRef, useEffect, useState} from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const posterWidth = screenWidth * 0.7;
  const sideSpacing = (screenWidth - posterWidth) / 2;
  const gap = 16;

  useEffect(() => {
    if (movies.length > 0) {
      startAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [movies, currentIndex, posterWidth]);

  const startAutoplay = () => {
    stopAutoplay(); // Certifica-se de não duplicar o intervalo
    scrollInterval.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % movies.length; // Próximo índice
      setCurrentIndex(nextIndex); // Atualiza o estado
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * (posterWidth + gap),
          animated: true,
        });
      }
    }, 3000); // Tempo em milissegundos (3 segundos)
  };

  const stopAutoplay = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  };

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
