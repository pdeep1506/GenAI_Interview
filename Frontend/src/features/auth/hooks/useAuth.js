import { useContext } from "react";
import { AuthContext } from "../auth.context.js";
import { login, regiser, logout, getMe } from "../services/auth.api.js";

export const useAuth = ()=>{

    const context = useContext(AuthContext);

    const {user, setUser, loading, setLoading} = context

    const handleLogin = async({email, password})=>{
        setLoading(true);
        const data = await login(email, password);
        console.log(data)
        setUser(data.user);
        setLoading(false)
    }

    const handleRegister = async({username, email,password})=>{
        setLoading(true)
        const data = await regiser(username, email, password);
        console.log(data);
        setUser(data.user);
        setLoading(false);
    }

    const handleLogout = async()=>{
        setLoading(true);
        const data = await logout();
        setUser(null)
    }

    return {user, loading, handleRegister, handleLogin, handleLogout}
}