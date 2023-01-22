import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import GlobalProvider from './context/GlobalProvider';
import GameProvider from './context/GameProvider';

function App(props) {
  return (
    <GlobalProvider>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </GlobalProvider>
  );
}

export default App;
