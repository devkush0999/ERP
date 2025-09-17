// import React from 'react';
// import {  StatusBar } from 'react-native';
// import AppNavigator from './src/navigation/AppNavigator';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const App = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView style={{ flex: 1 }}>
//         <AppNavigator />
//       </SafeAreaView>
//     </>
//   );
// };

// export default App;

import React from 'react';
import {  StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </>
  );
};

export default App;