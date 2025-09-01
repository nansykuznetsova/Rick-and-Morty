import './App.css'
import { Route, Routes } from "react-router";
import {CharacterList} from "./pages/СharacterList.tsx";
import {CharacterDetails} from "./pages/CharacterDetails.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="characters/:id" element={<CharacterDetails />} />
        </Routes>
    </>
  )
}

export default App
