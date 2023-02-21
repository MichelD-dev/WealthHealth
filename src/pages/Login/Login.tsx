import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import supabase from '@/config/supabaseClient'

const Login = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col  bg-white p-10 rounded-lg shadow-md mt-10 w-2/5">
        <header>
          <img
            className="m-auto"
            src="https://user.oc-static.com/upload/2020/08/14/15974125765772_image2.jpg"
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
          />
        </header>
      </div>
    </div>
  )
}
export default Login
