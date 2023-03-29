import { useRef } from 'react'
import Posts from '../../components/Posts'
import ModalNewPostIt from '../../components/ModalPostIt'
import SingOutBtn from '../../components/SingOutBtn.jsx'
import { useAuth } from '../../context/AuthContext'

function Dashboard() {
    const newPostItRef = useRef()
    const { user } = useAuth()

    return (
        <>
            <main className="bg-[image:var(--bg-dashboard)] bg-center bg-cover w-full h-[100vh] p-5 bg-no-repeat">
                <div className="h-full backdrop-blur-sm bg-[#ffffff86] shadow-sm px-12 py-5 rounded-3xl max-w-[1200px] m-auto flex flex-col">
                    <div className="w-full flex justify-between items-center mb-14">
                        <div className="flex gap-12 items-center">
                            <SingOutBtn/>
                            <div className="text-3xl text-secondery">
                                <b className="font-black">Olá</b><br />
                                <p className="m-0 capitalize">{user.split(" ")[0].toLowerCase()}.</p>
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn-primary text-base px-20" onClick={event => newPostItRef.current.createNewPostIt()}>
                                Novo post-it
                            </button>
                        </div>
                    </div>
                    <Posts />
                </div>
            </main>
            <ModalNewPostIt ref={newPostItRef}/>
        </>
    );
}

export default Dashboard;