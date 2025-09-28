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
    </>
  );
}

export default App;
