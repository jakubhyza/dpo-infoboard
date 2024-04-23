import { StopSearch } from "./components/admin/StopSearch"
import {BrowserRouter,Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/demo-admin/search" Component={StopSearch} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
