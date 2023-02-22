import supabase from '@/config/supabaseClient'
import {createContext, useContext, useEffect, useState, ReactNode} from 'react'

interface User {
  id: string
  email: string
}

interface AuthContextProps {
  user: User | null
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const storedUser = sessionStorage.getItem('user')
  const initialUser = storedUser ? JSON.parse(storedUser) : null
  const [user, setUser] = useState<User | null>(initialUser)

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    const {data} = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user as User)
      }
      if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
}

export default AuthProvider
