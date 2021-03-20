import './App.css';
import React from 'react'
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
import ItemPopup from './components/ItemPopup/ItemPopup'
import Feedback from './components/Feedback/Feedback'
import AllClosets from './components/AllClosets/AllClosets'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {AnimatePresence} from 'framer-motion'



const queryClient = new QueryClient()

function App() {




  return (
    <QueryClientProvider  client={queryClient}>
      <div className="App">
          <Router>
              <Switch>
                <Route path="/login" children={<Login/>}/>
                <Route path="/feedback/:id" children={<Feedback/>}/>
                <Dashboard >
                  <ItemPopup/>
                    <Route
                      render={({ location }) => (
                        <AnimatePresence exitBeforeEnter>
                          
                            <Switch location={location} key={location.pathname}>
                              <Route exact path="/" children={<Landing/>}/>
                              <Route path="/saved" children={<AllProducts/>}/>
                              <Route path="/setting" children={<Setting/>}/>
                              <Route path="/closets" children={<AllClosets/>}/>
                              <Route path="/closet/:id" children={<Closet/>}/>
                              <Route path="/user/:id" children={<Profile/>}/>
                              <Route path="*" children={ <NoMatch/>}/>
                              
                            </Switch>
                      
                        </AnimatePresence>
                      )}/>
                </Dashboard>
              </Switch>
          </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
}

export default App;
