"use client"

import { useState } from "react"

import { updateCommentDelete } from '@/app/lib/actions';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));


export default function UpdateComment({  id } : {  id: string}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateCommentDeleteWithId = updateCommentDelete.bind(null, id);

  return (
    <div className="group flex justify-center gap-4 ">
      <button
        onClick={() => {
          setIsModalOpen(true)
        }}
        className={`px-2 ml-2 text-[13px] text-[#200b1d77] duration-150 rounded-full opacity-80 hover:text-[#ffffff] hover:bg-[#548eff] active:opacity-100 `}
      >
        eliminar
      </button>

      <div className={`fixed z-30 inset-0 bg-gray-600 bg-opacity-50 items-center justify-center ${isModalOpen ? "flex" : "hidden"}`}>
        <div className="bg-white mx-3 p-6 rounded-lg shadow-lg w-96">
          <h3 className="m-0 text-base font-medium text-mauve12">Estas absolutamente seguro?</h3>
          <p className="mb-5 text-[14px] leading-normal text-mauve11">Eliminarás permanentemente el comentario.</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setIsModalOpen(false)
              }}
              className="bg-[#b7becc] duration-150 text-white px-4 py-2 rounded mr-2 hover:bg-[#9ca4b5]"
            >{/* bg-gray-400 */}
              Cancelar
            </button>

            <form action={updateCommentDeleteWithId}>
              <button 
                type='submit'
                onClick={() => {
                  wait().then(() => {
                    setIsModalOpen(false)
                    location.reload()
                  });
                }}
                className="inline-flex h-9 duration-150 items-center justify-center rounded bg-[#db0000] px-4 font-medium leading-none text-[#ffffffdd] outline-none outline-offset-1 hover:bg-[#b90000] hover:text-[#ffffff] focus-visible:outline-2 focus-visible:outline-red-700 select-none">
                  Confirmar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
