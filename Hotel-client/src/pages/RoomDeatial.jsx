import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets';
import Starrating from '../component/Starrating';

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const foundRoom = roomsDummyData.find(room => room._id === id);
    if (foundRoom) {
      setRoom(foundRoom);
      setMainImage(foundRoom.images[0]);
    }
  }, [id]);

  if (!room) return <p>Loading...</p>;

  return (
    <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Room Details */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-playfair">
          {room.hotel.name}
          <span className="font-inter text-sm"> ({room.roomType})</span>
        </h1>
        <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
          20% OFF
        </p>
      </div>

      {/* Room rating */}
      <div className="flex items-center gap-1 mt-2">
        <Starrating />
        <p className='ml-2'>200+ reviews</p>
      </div>

      {/* Room address */}
      <div className="flex items-center gap-1 text-gray-500 mt-2">
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel.address}</span>
      </div>

      {/* Room images */}
      <div className="flex flex-col lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 w-full">
          <img src={mainImage} alt="room" className="w-full rounded-lg shadow-lg object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
          {room.images.length > 1 &&
            room.images.map((image, index) => (
              <img
                key={index}
                onClick={() => setMainImage(image)}
                src={image}
                alt={`room-${index}`}
                className={`w-full rounded-md shadow-md object-cover cursor-pointer ${
                  mainImage === image ? 'outline-3 outline-orange-500' : ''
                }`}
              />
            ))}
        </div>
      </div>

      {/* Room highlights */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-playfair">Experience Luxury Like Never Before</h1>
          <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
            {room.amenities.map((item, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
      </div>

      {/* Check-in/check-out form */}
      <form
        className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
      >
        <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
          <div className="flex flex-col">
            <label htmlFor="checkInDate" className="font-medium">Check-in</label>
            <input type="date" id="checkInDate" className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
          </div>
          <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

          <div className="flex flex-col">
            <label htmlFor="checkOutDate" className="font-medium">Check-out</label>
            <input type="date" id="checkOutDate" className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
          </div>
          <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

          <div className="flex flex-col">
            <label htmlFor="guests" className="font-medium">Guests</label>
            <input type="number" id="guests" placeholder="0" className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none" required />
          </div>
        </div>

        <button type="submit" className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer">
          Check Availability
        </button>
      </form>

      {/* Common Specifications */}
      <div className="mt-25 space-y-4">
        {roomCommonData.map((spec, index) => (
          <div key={index} className="flex items-start gap-2">
            <img src={spec.icon} alt={`${spec.title}-icon`} className="w-6 h-6" />
            <div>
              <p className="text-base">{spec.title}</p>
              <p className="text-gray-500">{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Room description */}
      <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
        Guests will be allocated on the ground floor according to availability. You get a comfortable Two-bedroom apartment with a true city feeling. The price quoted is for two guests. Please mark the number of guests to get the exact price for groups.
      </div>

      {/* Hosted by */}
      <div className="flex  flex-col items-start gap-4">
        <div className="flex gap-4">
        <img src={assets.host} alt="host" 
        className="h-14 w-14 md:h-18 md:w-18 rounded-full" />
        <div className=' mt-1 flex flex-col'>
            <p className='text-lg font-bold md:text-xl'>Hosted by{room.hotel.name}</p>
           <div className='flex items-center mt-1'>
           <Starrating />
          
        <p className='ml-2 font-bold'>200+ reviews</p> </div></div>

        </div>
        
<button class="group group-hover:before:duration-500 group-hover:after:duration-500
 after:duration-500 hover:border-rose-300
  hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf]
   duration-500 before:duration-500 hover:duration-500 underline
    underline-offset-2 hover:after:-right-8 hover:before:right-12
    hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4
     origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800
      h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg 
       overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] 
       before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full
        before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content[''] 
         after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">
Contact Now
</button>


      </div>
    </div>
  );
};

export default RoomDetail;
