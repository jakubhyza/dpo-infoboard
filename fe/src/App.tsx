import {BrowserRouter,Route, Routes, useParams} from 'react-router-dom';
import PageIndex from './pages/PageIndex';
import StopSignWidget from './components/widgets/StopSign/StopSignWidget';
import PageSignEditor from './pages/PageSignEditor';
import PageSignList from './pages/PageSignList';
import PageSignEdit from './pages/PageSignEdit';
import PageSignDelete from './pages/PageSignDelete';
import PageSign from './pages/PageSing';
import PageLogin from './pages/PageLogin';
import PageLogout from './pages/PageLogout';

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
        <Route path="/admin/login" Component={PageLogin} />
        <Route path="/admin/logout" Component={PageLogout} />
        <Route path="/admin/signs/new" Component={PageSignEditor} />
        <Route path="/admin/signs/delete/:id" Component={PageSignDelete} />
        <Route path="/admin/signs/:id" Component={PageSignEdit} />
        <Route path="/admin/signs" Component={PageSignList} />
        <Route path="/sign/:id" Component={PageSign} />
        <Route path='/simple-stop/:id' Component={WidgetPage} />
        <Route path='/' Component={PageIndex} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
