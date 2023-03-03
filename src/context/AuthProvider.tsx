import supabase from '@/config/supabaseClient'
import {createContext, useContext, useEffect, useState, ReactNode} from 'react'

interface User {
  id: string
  email: string
}

interface AuthContextProps {
  user: User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>()

  useEffect(() => {
    const fetchSession = async () => {
      const {data} = await supabase.auth.getSession()
      setUser(data.session?.user as User)

      const {data: authListener} = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === 'SIGNED_IN') {
            setUser(session?.user as User)
          }
          if (event === 'SIGNED_OUT') {
            setUser(null)
          }
        },
      )
      return () => {
        authListener.subscription.unsubscribe()
      }
    }

    fetchSession()
  }, [])

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
}

export default AuthProvider
