"use client"

import { useState } from "react";
import axios from "axios"
import { toast } from 'react-toastify';

export function ModalIncreaseStatus({ pokemonId, status, setIsModalOpen }) {
  const [isFocused, setIsFocused] = useState(false);

  const statusValues = status?.reduce((acc, val) => {
    return {
      ...acc,
      [val.name]: val.baseStatus
    };
  }, {});
  const [valueInput, setValueInput] = useState(statusValues);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  async function atualizeNewValue() {
    const body = {
      ...valueInput,
      id: pokemonId
    }
    const response = await axios.patch("http://localhost:3000/api/update-status", body)
    if(response.status === 200) {
      toast.success('Update Success!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }


  return (
    <section className="flex items-center justify-center fixed inset-0 z-30 w-full h-screen bg-slate-950 bg-opacity-50">
      <div className="text-black bg-white py-4 px-10 rounded-lg relative">
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-12 h-12 absolute top-0 right-0 border-2 border-red-500 text-red-500 font-bold rounded-s-md transition-all hover:text-white hover:bg-red-500"
        >
          X
        </button>
        <ul className="flex flex-col py-10">
          {status?.map((info, i) => (
            <div className="relative mt-4" key={i}>
              <input
                type='number'
                name={info.name}
                value={valueInput[info.name]}
                onChange={({target}) => setValueInput((prevValue) => ({
                  ...prevValue,
                  [target.name]: Number(target.value)
                })) }
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border border-gray-600 rounded-md ${isFocused ? 'border-blue-500' : 'border-gray-300'} focus:outline-none focus:ring focus:ring-blue-200`}
              />
              <label
                className={`absolute text-black left-3 transition-all ${isFocused || info.baseStatus ? 'text-xs text-blue-500 bg-white' : 'text-gray-500'} ${
                  isFocused || info.baseStatus ? '-top-2' : 'top-2'
                }`}
              >
                {info.name}
              </label>
            </div>
          ))}
        </ul>
        <button
          onClick={atualizeNewValue}
          className="w-full text-center text-white border-2 bg-green-600 rounded-lg py-2 text-lg transition-all hover:border-green-600 hover:bg-transparent hover:text-green-600"
        >
          Atualizar
        </button>
      </div>
    </section>
  )
}