import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useMovies} from '../../hooks/useMovies';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {DynamicPosterCarousel} from '../../components/movies/DynamicPosterCarousel';

export const HomeScreen: React.FC = () => {
  const {top} = useSafeAreaInsets();

  const {isLoading, nowPlaying} = useMovies();

  if (isLoading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        {/* <PosterCarousel movies={nowPlaying} /> */}
        <DynamicPosterCarousel movies={nowPlaying} />
      </View>
    </ScrollView>
  );
};
