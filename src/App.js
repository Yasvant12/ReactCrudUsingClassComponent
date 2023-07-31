import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser";
import ViewUser from "./components/ViewUser";
import { Component } from "react";
import ViewById from "./components/ViewById";
import EditUser from "./components/EditUser";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<ViewUser />} />
            <Route exact path="/addUser" element={<AddUser />} />
            <Route
              exact
              path="/view/:id"
              
              element={<ViewById/>}
            />
            <Route exact path="/edit/:id" element={<EditUser/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
