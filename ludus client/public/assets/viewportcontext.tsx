'use client'

import { createContext, useEffect, useState, ReactNode, useContext } from "react";

export const ViewportContext = createContext({ width: 0, height: 0 });

type ViewportProviderProps = {
  children: ReactNode;
};


export const ViewportProvider = ({ children } : ViewportProviderProps) => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  );
};

export function useViewportContext (){
  const context = useContext(ViewportContext) 
  if (!context){
    throw new Error(
      'Viewport Context needs to be consumed inside a provider'
    )
  }
  return context
}