import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import './App.css';
import UserDirectory from './Components/UserDirectory';
import ProfilePage from './Components/ProfilePage';
import { DataComponent } from './Components/DataComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route element={<DataComponent/>}>
          <Route path='/' element={<UserDirectory/>}/>
          <Route path=':userId' element={<ProfilePage/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
