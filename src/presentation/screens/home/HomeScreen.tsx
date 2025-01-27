import {Text, useWindowDimensions, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useMovies} from '../../hooks/useMovies';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {DynamicPosterCarousel} from '../../components/movies/DynamicPosterCarousel';
import {HorizontalCarousel} from '../../components/movies/HorizontalCarousel';
import Icon from '@react-native-vector-icons/fontawesome6';

export const HomeScreen: React.FC = () => {
  const {top} = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();

  const {isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage} =
    useMovies();

  if (isLoading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const isLandscape = width > height;
  const isTablet = width >= 600;

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        {isTablet && <PosterCarousel movies={nowPlaying} />}
        {!isLandscape && <DynamicPosterCarousel movies={nowPlaying} />}
        <HorizontalCarousel
          movies={popular}
          title="Filmes mais populares"
          icon={
            <Icon name="fire" size={22} color="#FF4500" iconStyle="solid" />
          }
          loadNextPage={popularNextPage}
        />
        <HorizontalCarousel
          movies={topRated}
          title="Filmes mais bem avaliados"
          icon={
            <Icon name="star" size={22} color="#FFDB58" iconStyle="solid" />
          }
        />
        <HorizontalCarousel
          movies={upcoming}
          title="Filmes em breve"
          icon={
            <Icon name="calendar" size={22} color="#1E90FF" iconStyle="solid" />
          }
        />
      </View>
    </ScrollView>
  );
};
