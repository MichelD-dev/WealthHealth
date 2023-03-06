import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import supabase from '@/config/supabaseClient'
import {useAuth} from '@/context/AuthProvider'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const {user} = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/list')
    }
  }, [user])

  return (
    <div className="flex justify-center">
      <div className="flex flex-col  bg-white p-8 rounded-lg shadow-md mt-10 w-96">
        <header>
          <img
            className="m-auto"
            src="media/WealthHealth_logo.jpg"
            width="300"
            height="276"
            alt="Logo de Wealth Health"
          />
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#96b400',
                    brandAccent: '#849e00',
                  },
                  fontSizes: {
                    baseButtonSize: '16px',
                  },
                },
              },
            }}
            view="sign_in"
          />
        </header>
      </div>
    </div>
  )
}

export default Login
