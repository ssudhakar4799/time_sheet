import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom"
import Login from './Components/Login-page/Login';
import Registration from './Components/Registration-page/Registration';
import EmployeeList from './Components/Employee-List/EmployeeList';
import Edit_Details from './Components/Edite-Details.jsx/Edit_Details';
import { useSelector } from 'react-redux';
import TimeSheet from './Components/TimeSheet/TimeSheet';


function App() {
  const state = useSelector((state) => state);
  console.log(state.auth.isAuthentification);
  return (
    <>
        <BrowserRouter>
          {state.auth.isAuthentification ? (<>
            <ul className="navi" >
                <li>
                  <Link to="/Registration" className="link">
                  Registration
                  </Link>
                </li>
                <li>
                  <Link to="/Employee-List" className="link">
                  Employee-List
                  </Link>
                </li>
                <li><Link to="/TimeSheet" className="link">TimeSheet</Link></li>

              </ul>
             <Routes>
             <Route path='/' element={<EmployeeList />}></Route>
             <Route path='/Employee-List' element={<EmployeeList />}></Route>
             <Route path='/Edit-Details/:id' element={<Edit_Details />}></Route>
             <Route path='/TimeSheet' element={<TimeSheet />}></Route>
           </Routes>
           </>) : (  <>
           <Routes>
           <Route path='*' element={<Login />}></Route>
           <Route path='/' element={<Login />}></Route>
           <Route path='/Registration' element={<Registration />}></Route>
           {/* <Route path='/Employee-List' element={<EmployeeList />}></Route> */}
         </Routes>
         </>)}
         
        </BrowserRouter>
    </>

  );
}

export default App;
