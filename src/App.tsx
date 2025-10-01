import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';

import { CharacterDetails } from '@/pages/CharacterDetails';
import { CharacterList } from '@/pages/СharacterList';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<CharacterList />}
        />
        <Route
          path='characters/:id'
          element={<CharacterDetails />}
        />
      </Routes>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
        toastOptions={{
          duration: 7000,
          className: 'toast',
          error: {
            className: 'toast toast-error'
          }
        }}
      />
    </>
  );
}

export default App;
