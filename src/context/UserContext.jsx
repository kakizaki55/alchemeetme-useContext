import { useState, useContext, createContext, useEffect } from 'react'
import fetchUser from '../services/user'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUser()
      setUser(data)
    }
    fetchData()
  }, [])

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error(' context is undefined, must use useUser with in a UserProvider')
  }

  return context
}
