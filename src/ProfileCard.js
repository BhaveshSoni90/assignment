import React, { useEffect, useState } from "react";

// ProfileCard Component
const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [bgState, setBgState] = useState(0); 

  const bgConfig = [
    {
      image: "https://images.unsplash.com/photo-1731783995597-028d2210b12d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRoaW5nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      image: "https://png.pngtree.com/background/20210711/original/pngtree-blue-minimalistic-geometric-business-card-background-picture-image_1087817.jpg",
    },
    {
       
      gradient: "bg-gradient-to-br from-purple-200 via-pink-300 to-indigo-300"
    }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        "https://randomuser.me/api/?page=1&results=1&seed=abc"
      );
      const data = await response.json();
      setUser(data.results[0]);
    };

    fetchUserData();
  }, []);

  const toggleBackground = () => {
    setBgState((prevState) => (prevState + 1) % bgConfig.length); 
  };
  if (!user) return <div className="text-center py-10">Loading...</div>;
  const currentBgConfig = bgConfig[bgState];
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 via-pink-300 to-indigo-300 p-4 sm:p-6">
      <div className="absolute top-10 left-10">
        <button
          onClick={toggleBackground}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Change Background
        </button>
      </div>

      <div
        className={`relative ${currentBgConfig.gradient} w-full max-w-lg rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden transform transition-all hover:scale-105 duration-300 ease-in-out p-4 `}
        style={{
          backgroundImage: currentBgConfig.image ? `url(${currentBgConfig.image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: currentBgConfig.image ? "blur(px) brightness(50%)" : "none", 
        }}
      >
      
        <div className="sm:w-1/3 w-full p-4 flex justify-center items-center relative z-10">
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg border-4 border-white shadow-lg"
          />
        </div>

        <div className="p-6 flex flex-col justify-between w-full sm:w-2/3 space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white hover:text-indigo-300 transition-colors duration-300">
            {user.name.first} {user.name.last}
          </h2>
          <p className="text-base sm:text-lg font-medium text-gray-100">
            {user.gender}
          </p>
          <p className="text-base sm:text-lg text-gray-100">{user.phone}</p>

          <div className="mt-4">
            <a
              href={`mailto:${user.email}`}
              className="text-sm text-indigo-300 hover:underline"
            >
              {user.email}
            </a>
          </div>
          <div className="text-sm text-gray-100 mt-2">
            <p>
              {user.location.street.number} {user.location.street.name}
            </p>
            <p>
              {user.location.city}, {user.location.state}
            </p>
            <p>{user.location.country}</p>
          </div>
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-0"
          style={{
            display: currentBgConfig.image ? "block" : "none", 
          }}
        ></div>
      </div>
    </div>
  );
};
export default ProfileCard;