import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import {Home} from './Pages';
// import Home from './Pages/Home';
// import Movies from './Pages/Movies';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default App;
