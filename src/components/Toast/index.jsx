import { createPortal } from 'react-dom';
import { useState, forwardRef, useImperativeHandle } from "react";

const Toast = forwardRef((_, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState('success')
    const [description, setDescription] = useState('')

    useImperativeHandle(ref, () => {
        return {
            show(type, description) {
                setType(type)
                setDescription(description)
                setIsOpen(true)
                setTimeout(() => {
                    setIsOpen(false)
                    setType('success')
                    setDescription('')
                }, 5000)
            }
        }
    }, [])

    const config = {
        success: {
            bg: "bg-primary",
            textColor: "text-black",
            icon: "/img/success.svg"
        },
        warning: {
            bg: "bg-secondery",
            textColor: "text-white",
            icon: "/img/warning.svg"
        },
        error: {
            bg: "bg-red-500",
            textColor: "text-white",
            icon: "/img/error.svg"
        },
        info: {
            bg: "bg-gray",
            textColor: "text-black",
            icon: "/img/info.svg"
        }
    }

    return (
        <>
            {isOpen && (
                createPortal(
                    <div className={"fixed bottom-3 left-3 z-50 w-full h-auto p-1 flex items-center rounded-xl max-w-[300px] shadow-lg " + config[type].bg}>
                        <div className="px-2">
                            <img src={config[type].icon} alt="icon" />
                        </div>
                        <div className="p-2 flex-1">
                            <p className={"p-0 m-0 " + config[type].textColor}>{description}</p>
                        </div>
                    </div>,
                    document.body
                )
            )}
        </>
    )
})

export default Toast
