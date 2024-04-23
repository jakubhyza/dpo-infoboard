import {BrowserRouter,Route, Routes} from 'react-router-dom';
import PageIndex from './pages/PageIndex';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={PageIndex} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
