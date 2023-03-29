import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabse'
import getDomain from '../../utils/getDomain';

function Login() {
    const navigate = useNavigate()

    async function getSession() {
        const { data } = await supabase.auth.getSession()

        if (data.session) {
            navigate('/dashboard')
        }
    }

    async function signInWithGoogle(event) {
        event.preventDefault()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${getDomain()}dashboard`
            }
        })
    }

    useEffect(() => {
        getSession()
    }, [])

    return (
        <main className="p-[10px] w-screen h-screen bg-secondery flex items-center justify-center">
            <div className="bg-white max-w-[900px] max-h-[560px] h-full w-full rounded-2xl grid grid-rows-1 grid-cols-2 gap-1 md:grid-cols-1">
                <div className="p-5 flex justify-center items-center w-full">
                    <form action="" className="w-full">
                        <img
                            className="hidden md:block m-auto mb-8"
                            src="/img/logo-preta.png"
                            alt="logo Artip"
                            width={180}
                            height={70}
                        />
                        <h1 className="font-bold text-4xl w-full text-center mb-16">
                            Log in
                        </h1>
                        <p className="text-center mb-10">
                            Olá. Faça login diretamente com sua conta do Google, é simples rápido e seguro, não precisa se cadastrar.
                        </p>
                        <button
                            className="btn-secondery flex items-center justify-center gap-2"
                            onClick={e => signInWithGoogle(e)}
                        >  
                            <img 
                                className="w-8"
                                src="/img/google-icon.png" 
                                alt="" 
                            />
                            <p className="m-0">Entrar com o Google</p>
                        </button>
                    </form>
                </div>
                <div className="bg-[image:var(--bg-login)] flex items-center justify-center rounded-2xl md:hidden">
                    <img
                        src="/img/logo-branca.png"
                        alt=""
                        width={270}
                    />
                </div>
            </div>
        </main>
    )
}

export default Login
