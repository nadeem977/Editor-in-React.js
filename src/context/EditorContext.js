import { createContext, useState } from "react";


export const AppContext = createContext({})


export const AppContectProvider = ({children} = {}) =>{

 const[imgget ,setImgget] = useState([]) 
 const[ImgeID ,setIndexs] = useState([]) 
 const[imagespass ,setimagespass] = useState([]) 
    return (
        <AppContext.Provider value={{
            setImgget,
            imgget,
            ImgeID ,
            setIndexs,
            imagespass,
            setimagespass
        }}>
            {children}
        </AppContext.Provider>
    )
}