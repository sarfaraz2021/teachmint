import { Fragment } from "react";

const ModalCard = ({ isOpen, onClose, post }) => {
    return (
        <Fragment>
            {isOpen && (
                <div className="overlay">
                    <div className="overlay__background" onClick={onClose} />
                    <div className="overlay__container">
                        <div className="overlay__controls">
                            <button
                                className="overlay__close"
                                type="button"
                                onClick={onClose}
                            />
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <div className="d-flex justify-content-between">
                                    <div className="card-text text-left">{post.body}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default ModalCard;