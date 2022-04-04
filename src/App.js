
import './App.css';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import ProductInfo from './pages/ProductInfo'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
function App() { 
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element ={<HomePage/>}/>
      <Route path='/Login' exact element ={<LoginPage/>}/>
      <Route path='/Registration' exact element ={<RegistrationPage/>}/>
      <Route path='/Products/:productid' exact element ={<ProductInfo/>}/>
      <Route path='/Cart' exact element ={<CartPage/>}/>
      <Route path='/Admin' exact element ={<AdminPage/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
