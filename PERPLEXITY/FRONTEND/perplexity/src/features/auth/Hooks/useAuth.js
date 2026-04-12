import {useDispatch} from "react-redux"
import {login,register,getMe} from "../Services/auth.api.js"
import {setError,setLoading,setUser} from "../auth.slice.js"

export function useAuth(){
    const dispatch = useDispatch()
    async function handleRegister({email,username,password}){
        try{
            dispatch(setLoading(true))
            const data = await register(email,username,password)
        
        }
        catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
           

        } finally{
            dispatch(setLoading(false))
        }

    }
     async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            const data = await login({ email, password })
               

            console.log("Response",data)
            if(data?.user){
             dispatch(setUser(data.user))
             return true
            }
            return false
            
          
        } catch (err) {
             console.log("Error",err.response?.data)
              console.log(" FULL ERROR:", err);             
    console.log(" RESPONSE:", err.response);       
    console.log("DATA:", err.response?.data); 
            dispatch(setError(err.response?.data?.message || "Login failed"))
           
            return false
            
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handlegetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
          
        } catch (err) {

            dispatch(setError(err.response?.data?.message || "Failed to fetch user data"))
            
        } finally {
            dispatch(setLoading(false))
        }
    }
    return { handleRegister,
            handleLogin,
            handlegetMe
    }
}
