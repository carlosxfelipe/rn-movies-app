import {Text, useWindowDimensions, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useMovies} from '../../hooks/useMovies';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {DynamicPosterCarousel} from '../../components/movies/DynamicPosterCarousel';
import {HorizontalCarousel} from '../../components/movies/HorizontalCarousel';

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

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        {/* <PosterCarousel movies={nowPlaying} /> */}
        {!isLandscape && <DynamicPosterCarousel movies={nowPlaying} />}
        <HorizontalCarousel
          movies={popular}
          title="Filmes mais populares"
          loadNextPage={popularNextPage}
        />
        <HorizontalCarousel
          movies={topRated}
          title="Filmes mais bem avaliados"
        />
        <HorizontalCarousel movies={upcoming} title="Filmes em breve" />
      </View>
    </ScrollView>
  );
};
