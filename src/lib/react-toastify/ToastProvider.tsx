'use client';

import 'react-toastify/dist/ReactToastify.css'
import '@src/app/globals.css';
import { Bounce, ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        limit={3}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
        className="!w-full !max-w-[480px] !left-1/2 !-translate-x-1/2 !p-2"
        toastClassName="!rounded-md !mb-2"
      />
    </>
  )
}
