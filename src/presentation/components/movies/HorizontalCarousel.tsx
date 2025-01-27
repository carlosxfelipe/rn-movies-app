import {useEffect, useRef} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import {Movie} from '../../../core/entities/movie.entity';
import {FlatList} from 'react-native-gesture-handler';
import {MoviePoster} from './MoviePoster';

interface Props {
  movies: Movie[];
  title?: string;
  icon?: React.ReactNode;
  loadNextPage?: () => void;
}

export const HorizontalCarousel = ({
  movies,
  title,
  icon,
  loadNextPage,
}: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) {
      return;
    }

    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;
    if (!isEndReached) {
      return;
    }

    isLoading.current = true;

    // Carregar os próximos filmes
    loadNextPage && loadNextPage();
  };

  return (
    <View style={{height: title ? 260 : 220}}>
      {title && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginBottom: 10,
          }}>
          {icon && <View style={{marginRight: 10}}>{icon}</View>}
          <Text
            style={{
              fontSize: 26,
              fontWeight: '300',
            }}>
            {title}
          </Text>
        </View>
      )}

      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    </View>
  );
};
