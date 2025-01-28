import 'react-native-gesture-handler';

import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Navigation} from './presentation/navigation/Navigation';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={Colors.lighter}
      />
      <Navigation />
    </NavigationContainer>
  );
}

export default App;
