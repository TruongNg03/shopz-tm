import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddForm({ children, show = false, title, disabled, onHide }) {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={false}
            backdrop="static"
            scrollable
        >
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title id="contained-modal-title-vcenter" className="fs-3">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button className="fs-4" variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button className="fs-4" type="submit" form="add-product-form" disabled={disabled}>
                    Thêm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddForm;
