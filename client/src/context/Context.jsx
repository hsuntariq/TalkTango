import { createContext, useState } from 'react'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [videoLink, setVideoLink] = useState('')

    return <AppContext.Provider value={{
        videoLink,
        setVideoLink
    }}>
        {children}
    </AppContext.Provider>
}