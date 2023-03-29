import { useRef } from "react";
import supabase from "../../services/supabse";
import Toast from "../Toast";
import ModalPostIt from '../ModalPostIt'

function Card({ describe, color, status, id }) {
    const toastRef = useRef();
    const modalRef = useRef();

    async function updateStatusPostIt(value) {
        const { error } = await supabase
            .from('post_it')
            .update({ status: value })
            .eq('id', id)

        if (error) {
            toastRef.current.show(
                'error',
                'Ocorreu um error inesperado'
            )

        } else {
            toastRef.current.show(
                'success',
                'Post-it atualizado com sucesso!'
            )
        }
    }

    async function deletePostIt() {
        const { error } = await supabase
            .from('post_it')
            .delete()
            .eq('id', id)

        if (error) {
            toastRef.current.show(
                'error',
                'Ocorreu um error inesperado'
            )
        }
    }

    return (
        <>
            <div className={"p-6 max-h-[250px] rounded-2xl h-full min-h-[250px] flex relative flex-col " + color}>
                <div>
                    <div className="flex items-center justify-between pb-4">
                        <div>
                            <button type="button">
                                {color === 'bg-secondery' ?
                                    <img src="/img/menu-2.svg" alt="toggle menu" />
                                    :
                                    <img src="/img/menu.svg" alt="toggle menu" />
                                }
                            </button>

                            <div
                                uk-dropdown="mode: click"
                                className="bottom-left bg-gray p-1 rounded-xl"
                            >
                                <button className="p-2 flex gap-4 text-secondery" onClick={e => modalRef.current.editPostIt(true, describe, color, status)}>
                                    <img src="/img/edit.svg" alt="" width={20} />
                                    Editar
                                </button> 
                                <hr className="m-0" />
                                <button className="p-2 flex gap-4 text-secondery" onClick={e => deletePostIt()}>
                                    <img src="/img/trash-2.svg" alt="" width={20} />
                                    Excluir
                                </button>
                            </div>
                        </div>
                        <select defaultValue={status} className="rounded-md bg-gray text-secondery" onChange={e => updateStatusPostIt(e.target.value)}>
                            <option value="feito">Feito</option>
                            <option value="pendente">Pendente</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-hidden flex-1">
                    <p className={"text-2xl " + (color === "bg-secondery" ? "text-white" : "text-secondery")}>
                        {describe}
                    </p>
                </div>
            </div>
            <Toast ref={toastRef} />
            <ModalPostIt ref={modalRef} />
        </>
    );
}

export default Card;