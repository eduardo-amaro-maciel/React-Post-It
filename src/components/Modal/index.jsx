import { useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, isOpen, setIsOpen }) {
    const containerRef = useRef(0)

    function onClickModalWindow(event) {
        if (containerRef.current === event.target) {
            setIsOpen(false)
        }
    }

    return (
        <>
            {isOpen && (
                createPortal(
                    <div onClick={event => onClickModalWindow(event)} ref={containerRef}
                        className="fixed top-0 left-0 z-50 overflow-y-auto w-full h-[100vh] p-1 bg-[rgba(0,0,0,.6)] items-center justify-center flex"
                    >
                        <div className="h-auto w-[520px] bg-white p-5 rounded-xl relative">
                            <button className="absolute right-5" onClick={event => setIsOpen(false)}>
                                <img src="/img/x.svg" alt="fechar modal" />
                            </button>
                            {children}
                        </div>
                    </div>,
                    document.body
                )
            )}
        </>
    );
}

export default Modal;