import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/Navbar';
import Blogs from './components/Blogs';
import SingleBlog from './components/SingleBlog';
import EditBlog from './components/EditBlog';
import AddBlog from './components/AddBlog';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Navbar />
          <br /> <br />
          <Switch>
            <Route path="/" exact component={Blogs} />
            <Route path="/add" exact component={AddBlog} />
            <Route path="/blogs/update/:id" component={EditBlog} />
            <Route path="/:id" component={SingleBlog} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;