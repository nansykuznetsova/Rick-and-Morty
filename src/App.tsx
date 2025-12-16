import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';

import { CharacterDetails, CharacterList, NotFoundPage } from '@/pages';

import './App.scss';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<CharacterList />}
        />
        <Route
          path='character/:id'
          element={<CharacterDetails />}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
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
