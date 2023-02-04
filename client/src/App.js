import './App.css';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import LandingPages from './pages/LandingPages/LandingPages';
import HomePage from './pages/HomePage/HomePage.jsx'
import Detail from './pages/Detail/Detail';
import CreateDog from './pages/CreateDog/CreateDog.jsx'
import Prueba from './components/Prueba/Prueba';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path={"/"} component={LandingPages}/>
          <Route exact path={"/home"} component={HomePage}/>
          <Route exact path={"/detail/:id"} component={Detail}/>
          <Route exact path={"/create"} component={CreateDog}/>
          <Route exact path={"/prueba"} component={Prueba}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
