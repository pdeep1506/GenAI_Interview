import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, regiser, logout, getMe } from "../services/auth.api.js";

export const useAuth = ()=>{

    const context = useContext(AuthContext);

    const {user, setUser, loading, setLoading} = context

    const handleLogin = async({email, password})=>{
        // console.log(email,password)
        setLoading(true);
        try{

            const data = await login({email, password});
            // console.log(data.data.data)
            setUser(data.data.data);
            console.log("success login")
        }
        catch(error){

        }
        finally{

            setLoading(false)
        }
    }

    const handleRegister = async({username, email,password})=>{
        // console.log(username, email, password)
        try{

            setLoading(true)
            const data = await regiser({username, email, password});
            // console.log(data.data)
            setUser(data.data);
            console.log("Success register ")
        }
        catch(error){

        }
        finally{

            setLoading(false);
        }
    }

    const handleLogout = async()=>{
        setLoading(true);
        try{

            const data = await logout();
            setUser(null)
            console.log("Logout successfully")
        }
        catch(error){

        }
        finally{
            setLoading(false);
        }

    }

    return {user, loading, handleRegister, handleLogin, handleLogout}
}