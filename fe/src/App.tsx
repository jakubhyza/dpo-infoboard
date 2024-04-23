import {BrowserRouter,Route, Routes, useParams} from 'react-router-dom';
import PageIndex from './pages/PageIndex';
import StopSignWidget from './components/widgets/StopSign/StopSignWidget';

function WidgetPage() {
  const {id} = useParams();

  if (!id) {
    return 'No stop ID provided';
  }

  return (
    <StopSignWidget stopId={id} />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/simple-stop/:id' Component={WidgetPage} />
        <Route path='/' Component={PageIndex} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
