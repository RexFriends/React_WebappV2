import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Componenets
import Closet from './components/Closet/Closet'
import Dashboard from './components/Dashboard/Dashboard'
import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import NoMatch from './components/NoMatch/NoMatch'
import Profile from './components/Profile/Profile'
import AllProducts from './components/AllProducts/AllProducts'
import Setting from './components/Setting/Setting'

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/login" children={<Login/>}/>
              <Dashboard>
                <Switch>
                  <Route exact path="/" children={<Landing/>}/>
                  <Route path="/closets" children={<AllProducts/>}/>
                  <Route path="/setting" children={<Setting/>}/>
                  <Route path="/closet/:id" children={<Closet/>}/>
                  <Route path="/user/:id" children={<Profile/>}/>
                  <Route path="*" children={ <NoMatch/>}/>
                </Switch>
              </Dashboard>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
