import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, regiser, logout, getMe } from "../services/auth.api.js";

export const useAuth = ()=>{

    const context = useContext(AuthContext);

    const {user, setUser, loading, setLoading} = context

    const handleLogin = async({email, password})=>{
        console.log(email,password)
        setLoading(true);
        const data = await login({email, password});
        // console.log(data.data.data)
        setUser(data.data.data);
        setLoading(false)
    }

    const handleRegister = async({username, email,password})=>{
        console.log(username, email, password)
        setLoading(true)
        const data = await regiser({username, email, password});
        // console.log(data.data)
        setUser(data.data);
        setLoading(false);
    }

    const handleLogout = async()=>{
        setLoading(true);
        const data = await logout();
        setUser(null)
    }

    return {user, loading, handleRegister, handleLogin, handleLogout}
}