//import logo from './logo.svg';
import './App.css';
import CarsList from './Components/CarsList.jsx';
import { AddForm, UpdateForm } from "./Components/AddForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CarDetails } from './Components/Caritem';
function App() {
  return (
    // ROUTING CODE
    <Router>
      <Routes>
        <Route exact path="/" element={<CarsList/>} />
        <Route exact path="/add" element={<AddForm />} />
        <Route exact path="/update/:id" element={<UpdateForm />} />
        <Route exact path="/car/:id" element={<CarDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
