import supabase from "../../services/supabse"
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useAuth } from "../../context/AuthContext"
import Toast from "../Toast"

function SingOutBtn() {
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const toastRef = useRef(null)

    async function singOut(event) {
        event.preventDefault()
        const { error } = await supabase.auth.signOut()

        if (error) {
            toastRef.current.show(
                'error',
                'Ocorreu um error inesperado'
            )
        }

        setUser(null)
        navigate('/login')
    }

    return (
        <>
            <button data-uk-tooltip="Sing Out" onClick={event => singOut(event)} className="bg-secondery p-2 rounded-xl">
                <img src="/img/sair.svg" alt="" />
            </button>
            <Toast ref={toastRef} />
        </>
    )
}

export default SingOutBtn