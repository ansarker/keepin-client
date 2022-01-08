import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchProvider';
import { bars, close } from '../../assets/icons/Icon';

const Header = ({ open, handleSidebar }) => {
  const { setValue } = useContext(SearchContext);
  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="md:w-60">
        <h2 className="uppercase text-lg text-black font-bold tracking-wider">Keepin</h2>
        <h6 className="text-xs hidden sm:block font-normal text-gray-600 tracking-wider">Keep your credentials safe</h6>
      </div>
      <div className="flex-grow px-3">
        <input onChange={(evt) => setValue(evt.target.value)} className="border border-gray-400 text-gray-600 bg-white w-full px-3 py-2 rounded-lg focus:outline-none focus:border-gray-400" type="text" placeholder="Search..." />
      </div>
      <button onClick={handleSidebar} className={`${open ? 'block' : ''} md:hidden p-2 rounded-md bg-white shadow-md`}>
        {
          open ? bars : close
        }
      </button>
    </div>
  );
}

export default Header;
