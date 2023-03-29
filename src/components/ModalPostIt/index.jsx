import { useState, forwardRef, useImperativeHandle, useRef } from 'react'

import Modal from '../Modal';
import supabase from '../../services/supabse';
import Toast from '../Toast';

const ModalNewPostIt = forwardRef((_, ref) => {
    const [describePostIt, setDescribePostIt] = useState('')
    const [colorPostIt, setColorPostIt] = useState('')
    const [statusPostIt, setStatusPostIt] = useState('default')
    const [isSaving, setIsSaving] = useState(false)
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [mode, setMode] = useState('');
    const toastRef = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            show(isOpen) {
                setModalIsVisible(isOpen)
            },

            createNewPostIt() {
                setMode('create')
                setModalIsVisible(true)
                setColorPostIt('');
                setDescribePostIt('');
                setStatusPostIt('default');
                setMode('create')
            },
            
            editPostIt(isOpen, describe, color, status) {
                setModalIsVisible(isOpen)
                setColorPostIt(color);
                setDescribePostIt(describe);
                setStatusPostIt(status);
                setMode('edit')
            }
        }
    }, [])

    async function onSaveNewPost(event) {
        event.preventDefault()
        setIsSaving(true)

        if ((describePostIt === "") || (colorPostIt === "") || (statusPostIt === "" && statusPostIt != "default")) {
            toastRef.current.show(
                'error',
                'Ocorreu um error inesperado'
            )

            setIsSaving(false)

        } else {
            const { data } = await supabase.auth.getUser()
            const { error } = await supabase
                .from('post_it')
                .insert([{
                    description: describePostIt,
                    status: statusPostIt,
                    color: colorPostIt,
                    userId: data.user.id
                }])

            if (error) {
                toastRef.current.show(
                    'error',
                    'Ocorreu um error inesperado'
                )

            } else {
                setIsSaving(false)
                setModalIsVisible(false)
                setDescribePostIt('')
                setColorPostIt('')
                setStatusPostIt('default')
            }
        }
    }

    async function onEditPostIt(event) {
        event.preventDefault()
        setIsSaving(true)

        if ((describePostIt === "") || (colorPostIt === "") || (statusPostIt === "" && statusPostIt != "default")) {
            toastRef.current.show(
                'error',
                'Ocorreu um error inesperado'
            )

            setIsSaving(false)

        } else {


            const { data } = await supabase.auth.getUser()
            const { error } = await supabase
                .from('post_it')
                .insert([{
                    description: describePostIt,
                    status: statusPostIt,
                    color: colorPostIt,
                    userId: data.user.id
                }])

            if (error) {
                toastRef.current.show(
                    'error',
                    'Ocorreu um error inesperado'
                )

            } else {
                setIsSaving(false)
                setModalIsVisible(false)
                setDescribePostIt('')
                setColorPostIt('')
                setStatusPostIt('default')
            }
        }
    }

    function onFormSend(event) {

        mode === 'create' ? onSaveNewPost(event) : onEditPostIt(event)
    }

    return (
        <Modal isOpen={modalIsVisible} setIsOpen={setModalIsVisible}>
            <form action="#">
                <h1 className="text-3xl m-0 pb-6">Novo Post-it</h1>
                <div className="relative">
                    <input type="text" maxLength={56} value={describePostIt} placeholder="Breve descrição do post-it" onChange={e => setDescribePostIt(e.target.value)} tabIndex="1"
                        className="w-full border-2 p-3 rounded focus:outline-none pr-20"
                    />
                    <span className="absolute right-2 top-3">{describePostIt.length}/56</span>
                </div>

                <div className="flex gap-10 mb-10 justify-center mt-5">
                    <div>
                        <p className="mb-3">Cor do cartão</p>
                        <div className="flex gap-5 p-2 rounded border-2">
                            <label>
                                <input type="radio" name="color-card" checked={colorPostIt === "bg-gray"} value="bg-gray" onChange={e => setColorPostIt(e.target.value)} tabIndex="2"
                                    className="hidden peer"
                                />
                                <div className="h-8 w-8 rounded-full bg-gray shadow-inner peer-checked:border-4 border-white outline-2 outline"></div>
                            </label>
                            <label>
                                <input type="radio" name="color-card" value="bg-secondery" checked={colorPostIt === "bg-secondery"} onChange={e => setColorPostIt(e.target.value)} tabIndex="3"
                                    className="hidden peer"
                                />
                                <div className="h-8 w-8 rounded-full bg-secondery shadow-inner peer-checked:border-4 border-white outline-2 outline"></div>
                            </label>
                            <label>
                                <input type="radio" name="color-card" value="bg-primary" checked={colorPostIt === "bg-primary"} onChange={e => setColorPostIt(e.target.value)} tabIndex="4"
                                    className="hidden peer"
                                />
                                <div className="h-8 w-8 rounded-full bg-primary shadow-inner peer-checked:border-4 border-white outline-2 outline"></div>
                            </label>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="modal-select-status">Status</label>
                        <select value={statusPostIt} name="modal-select-status" onChange={e => setStatusPostIt(e.target.value)} tabIndex="5"
                            className="w-full mt-3 p-3 rounded border-2"
                        >
                            <option value="default" disable="true" hidden>
                                Status do Post-it
                            </option>
                            <option value="feito">Feito</option>
                            <option value="pendente">Pendente</option>
                        </select>
                    </div>
                </div>
                <button type="button" onClick={e => onFormSend(e)} tabIndex="6"
                    className={"btn-primary " + (isSaving ? "pointer-events-none opacity-70" : "auto opacity-100")}
                >
                    Salvar
                </button>
                <Toast ref={toastRef} />
            </form>
        </Modal>
    );
})

export default ModalNewPostIt;