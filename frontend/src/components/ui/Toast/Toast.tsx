import { useEffect, useState } from "react";

import "./Toast.css";

interface ToastProps {
    message: string;
    type?: "error" | "success" | "info";
    onClose: () => void;
    duration?: number;
}

function Toast({
    message,
    type = "info",
    onClose,
    duration = 4000,
}: ToastProps) {
    const [isClosing, setIsClosing] =
        useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClosing(true);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    useEffect(() => {
        if (!isClosing) {
            return;
        }

        const timer = setTimeout(() => {
            onClose();
        }, 250);

        return () => clearTimeout(timer);
    }, [isClosing, onClose]);

    function handleClose() {
        setIsClosing(true);
    }

    return (
        <div
            className={`toast toast--${type} ${
                isClosing ? "toast--closing" : ""
            }`}
            role="alert"
        >
            <div className="toast__content">
                <span className="toast__icon">
                    {type === "error"
                        ? "!"
                        : type === "success"
                        ? "✓"
                        : "i"}
                </span>

                <p className="toast__message">
                    {message}
                </p>
            </div>

            <button
                type="button"
                className="toast__close"
                onClick={handleClose}
                aria-label="Cerrar mensaje"
            >
                ×
            </button>
        </div>
    );
}

export default Toast;