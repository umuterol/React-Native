import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import Navigation from './navigation';
import { useFonts } from 'expo-font'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
})
const store = createStore(rootReducer);

export default function App() {
  const [loaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
