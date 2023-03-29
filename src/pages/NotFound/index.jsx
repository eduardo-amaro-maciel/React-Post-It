import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate()

    function redirectTo(event) {
        event.preventDefault()
        navigate('/login')
    }

    return (
        <div className="flex items-center justify-center w-full h-[100vh] text-3xl text-secondery flex-col">
            <img src="/img/404.svg" alt="404" className="w-[500px]" />
            <h1 className="text-4xl m-0 mt-9">Parece que você está perdido</h1>
            <p className="text-zinc-500 text-xl">A página que você está procurando não está disponível</p>
            <button className="btn-primary max-w-xs mt-3" onClick={e => redirectTo(e)}>Voltar ao inicio</button>
        </div>
    );
}

export default NotFound;