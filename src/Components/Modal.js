import React from 'react';

const Modal = ({ isOpen, onClose, post }) => {

    const handleOverlayClick = (event) => {
        // console.log()
        if (event.target.classList.contains('overlay')) {
            console.log("overlay clicked")
          onClose();
        }
      }

  return (
    <div>
    <div className="overlay" zIndex='900' onClick={()=>{
        onClose()
    }}>
    <div className={`modal ${isOpen ? 'show' : ''}`} zIndex="1000" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center">{post?.title}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">{post?.body}</div>
        </div>
      </div>
    </div>
</div></div>
  );
};

export default Modal;
