import React from 'react'

export const ToastUndo = ({ label, id, removeTemp, closeToast }) => {
    function handleClick() {
        removeTemp(id);
        closeToast();
    }

    return (
        <div>
            <h5>
                {label} Deleted <button className="btn btn-default" onClick={handleClick}>UNDO</button>
            </h5>
        </div>
    );
}