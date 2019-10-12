import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store'
import Todo from './src/components/todo'

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <View >
          <Todo />
        </View>
      </Provider>
    </>
  );
};
export default App;
