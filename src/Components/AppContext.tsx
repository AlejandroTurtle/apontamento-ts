import { createContext, useEffect, useState } from "react"
import { getAllLocalStorage } from "../services/storage"

interface IAppContext {

    isLoggedIn: boolean
    setisLoggedIn: (isLoggedIn: boolean) => void
  }
   export const AppContext = createContext({} as IAppContext)
   export const AppContextProvider = ({children}: any) => {
    const [ isLoggedIn , setisLoggedIn] = useState<boolean>(false)



    useEffect(() => {
      const storage = getAllLocalStorage()
      if(storage){
        const { login } = JSON.parse(storage)
        setisLoggedIn(login)
      }
    }, [])

   


    return(
      <AppContext.Provider value={{isLoggedIn, setisLoggedIn}}>
        {children}
      </AppContext.Provider>
    )
  }