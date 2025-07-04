"use client"


import { useState } from "react"
import { TrashIcon } from '@heroicons/react/24/outline';

import { deleteConsulta } from '@/app/lib/actions';
import { ButtonB } from "@/app/ui/button";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));


export default function DeleteConsulta({ id }: { id: string }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteConsultaWithId = deleteConsulta.bind(null, id);


  return (
    <>
      <div className="flex justify-center gap-4 ">
        <ButtonB 
          type='button' 
          className="border-none inline-flex h-[35px] !duration-0 items-center justify-center !rounded-md !bg-[#ffffff99] opacity-70 py-2 !px-2 font-medium leading-none text-violet11 outline-none outline-offset-1 hover:!bg-[#ffffffdd] hover:opacity-100 focus-visible:outline-2 focus-visible:outline-violet6 select-none"
          onClick={() => setIsModalOpen(true)}
          >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-[22px] text-[#b53f51]" />
        </ButtonB>

        <div className={`fixed z-10 inset-0 bg-gray-600 bg-opacity-50 items-center justify-center ${isModalOpen ? "flex" : "hidden"}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="m-0 text-base font-medium text-mauve12 text-gray-950">Estas absolutamente seguro?</h3>
            <p className="mb-5 text-[14px] leading-normal text-mauve11 text-gray-900">Eliminarás permanentemente la consulta.</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 duration-150 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
              >
                Cancelar
              </button>

              <form action={deleteConsultaWithId}>
                <button 
                  type='submit'
                  onClick={() => {
                    wait().then(() => setIsModalOpen(false));
                  }}
                  className="inline-flex h-9 duration-150 items-center justify-center rounded bg-[#db0000] px-4 font-medium leading-none text-[#ffffffdd] outline-none outline-offset-1 hover:bg-[#b90000] hover:text-[#ffffff] focus-visible:outline-2 focus-visible:outline-red-700 select-none">
                    Confirmar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
