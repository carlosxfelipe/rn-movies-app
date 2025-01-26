import {StatusBar} from 'react-native';
// import {useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';
import {FullScreenLoader} from '../../components/loaders/FullScreenLoader';
import {MovieHeader} from '../../components/movie/MovieHeader';
import {MovieDetails} from '../../components/movie/MovieDetails';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  // const {movieId} = useRoute().params as any;
  const {movieId} = route.params;
  const {isLoading, movie, cast = []} = useMovie(movieId);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ScrollView>
        <MovieHeader
          originalTitle={movie!.originalTitle}
          title={movie!.title}
          poster={movie!.poster}
        />

        <MovieDetails movie={movie!} cast={cast} />
      </ScrollView>
    </>
  );
};
