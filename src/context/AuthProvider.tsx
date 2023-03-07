import supabase from '@/config/supabaseClient'
import {createContext, useContext, useEffect, useState, ReactNode} from 'react'

interface User {
  id: string
  email: string
}

interface AuthContextProps {
  user: User | null
}

/**
Contexte d'authentification.
*/
const AuthContext = createContext<AuthContextProps>({
  user: null,
})

/**
Hook permettant d'accéder au contexte d'authentification.
*/
export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

const {data} = await supabase.auth.getSession()

/**
Composant qui fournit un contexte d'authentification pour l'application.
Ce composant utilise le client Supabase pour écouter les changements d'état
de l'authentification de l'utilisateur.
@param children Les composants enfants qui ont besoin d'accéder au contexte d'authentification.
*/
const AuthProvider = ({children}: AuthProviderProps) => {
  // Initialise l'état de l'utilisateur à partir de la session en cours.
  const [user, setUser] = useState<User | null>(data.session?.user as User)

  useEffect(() => {
    // Abonne la fonction à l'événement de changement d'état de l'authentification.
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
    // Désabonne la fonction de l'événement de changement d'état de l'authentification.
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
}

export default AuthProvider
