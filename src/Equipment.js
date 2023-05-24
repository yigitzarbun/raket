import React from "react";

function Equipment() {
  return (
    <div className="bg-gradient-to-r from-green-500 to-yellow-500 p-8 w-full mt-8 rounded-md shadow-md">
      <h2 className="font-bold text-4xl">Equip</h2>
      <nav className="flex justify-between items-end mt-4">
        <a
          className="font-bold flex-col w-1/4 text-center p-2 hover:bg-slate-900 hover:rounded-md hover:text-white cursor-pointer"
          href="https://www.spx.com.tr/sporlar-tenis/?"
          target="_blank"
        >
          <img src="/images/racket.png" alt="racket" className="h-28 mx-auto" />
          <p>Rackets</p>
        </a>
        <a
          className="font-bold flex-col w-1/4 text-center p-2 hover:bg-slate-900 hover:rounded-md hover:text-white cursor-pointer"
          href="https://www.spx.com.tr/sporlar-tenis/?"
          target="_blank"
        >
          <img
            src="/images/tshirt.png"
            alt="clothing"
            className="h-28 mx-auto"
          />
          <p> Clothing</p>
        </a>

        <a
          className="font-bold flex-col w-1/4 text-center p-2 hover:bg-slate-900 hover:rounded-md hover:text-white cursor-pointer"
          href="https://www.spx.com.tr/sporlar-tenis/?"
          target="_blank"
        >
          <img src="/images/shoes.png" alt="shoes" className="h-28 mx-auto" />
          <p> Shoes</p>
        </a>
        <a
          className="font-bold flex-col w-1/4 text-center p-2 hover:bg-slate-900 hover:rounded-md hover:text-white cursor-pointer"
          href="https://www.spx.com.tr/sporlar-tenis/?"
          target="_blank"
        >
          <img src="/images/balls.png" alt="other" className="h-28 mx-auto" />
          <p> Other</p>
        </a>
      </nav>
    </div>
  );
}

export default Equipment;
