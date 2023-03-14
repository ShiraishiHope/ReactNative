import { StyleSheet, Text, View } from 'react-native';
import { store } from './src/app/store'
import { Provider } from 'react-redux'
import {Counter} from "./src/features/counter/Counter";

export default function App() {
  return (
      <Provider
          store={store}
          >
        <Counter />
      </Provider>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:100,
    padding: 100,
    backgroundColor: '#6A7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
