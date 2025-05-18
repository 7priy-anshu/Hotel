import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Footer from './component/Footer';
import AllRoom from './pages/AllRoom';
import RoomDetail from './pages/RoomDeatial';
import MyBookings from './pages/MyBookings';
import HotelReg from './component/HotelReg';
import LayOut from './pages/HotelOwnner/LayOut';
import Dasboard from './pages/HotelOwnner/Dashboard';
import AddRoom from './pages/HotelOwnner/AddRoom';
import ListRoom from './pages/HotelOwnner/ListRoom';



const App = () => {
  const { pathname } = useLocation();
  const isOwnerPath = pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false &&  <HotelReg />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRoom />} />
          <Route path='/rooms/:id' element={<RoomDetail />} /> 
          <Route path='/my-booking' element={<MyBookings />} />
          <Route path='/owner' element = {<LayOut/>}>
           <Route index element={<Dasboard/>} />
           <Route path='add-room' element={<AddRoom/>} />
           <Route path='list-room' element={<ListRoom/>} />

          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />} 
    </div>
  );
};

export default App;
