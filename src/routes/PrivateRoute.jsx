import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import supabase from "../services/supabse";
import Loading from "../components/Loading";

function PrivateRoute() {
    const [loading, setLoading] = useState(true)
    const [dataSession, setDataSession] = useState(null)
    const { setUser } = useAuth() 

    useEffect(() => {
        async function getSession() {
            const { data } = await supabase.auth.getSession()
            setDataSession(data.session ?? null)
            setUser(data?.session?.user?.identities[0]?.identity_data?.name ?? null)
            setLoading(false)
        }

        getSession()
    }, [])

    if (loading) {
        return <Loading />
    }
    
    return (
        !loading && dataSession ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoute;