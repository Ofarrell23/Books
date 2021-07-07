import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";


import NavBar from './components/NavBar';
import SearchPage from './components/SearchPage';
import SavedPage from './components/SavedPage';


function App() {
  return (
    <Router>
      <NavBar/>
        <Route exact path= {["/", "/search", "/google_books_search"]}  component={SearchPage} />
        <Route exact path= "/saved"  component={SavedPage} />
    </Router>
  );
}

export default App;
