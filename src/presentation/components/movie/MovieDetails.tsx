import {Text, View} from 'react-native';
import {FullMovie} from '../../../core/entities/movie.entity';
import {Formatter} from '../../../config/helpers/formatter';
import {Cast} from '../../../core/entities/cast.entity';
import {FlatList} from 'react-native-gesture-handler';
import {CastActor} from '../cast/CastActor';

interface Props {
  movie: FullMovie;
  cast: Cast[];
}

export const MovieDetails = ({movie, cast}: Props) => {
  const safeRating = movie?.rating ?? 'N/A';
  const safeGenres = movie?.genres?.length
    ? movie.genres.join(', ')
    : 'Gêneros indisponíveis';
  const safeDescription = movie?.description ?? 'Descrição não disponível';
  const safeBudget = Formatter.currency(movie?.budget); // Já tratado pelo Formatter
  const safeCast = Array.isArray(cast) ? cast : []; // Garante que cast seja um array

  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text>{safeRating}</Text>
          <Text style={{marginLeft: 5}}>- {safeGenres}</Text>
        </View>

        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Sinopse
        </Text>
        <Text style={{fontSize: 16, textAlign: 'justify'}}>
          {safeDescription}
        </Text>

        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Orçamento
        </Text>
        <Text style={{fontSize: 18}}>{safeBudget}</Text>
      </View>

      <View style={{marginTop: 10, marginBottom: 50}}>
        <Text
          style={{
            fontSize: 23,
            marginVertical: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Atores
        </Text>

        <FlatList
          data={safeCast}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <CastActor actor={item} />}
        />
      </View>
    </>
  );
};
