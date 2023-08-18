import MealApp from './MealApp';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Recipe from './Recipe';
import NavBar from './NavBar';
import Login from './Login';
import  Spinner from './Spinner';

function App() {
  return (
    <Spinner children={<div>
      <NavBar />
      <Routes>
        <Route path="/" element={<MealApp />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/recipes/:id/*" element={<Recipe />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>}/>
  );
}

export default App;
