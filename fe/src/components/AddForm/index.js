import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddForm({ children, show = false, title, onHide, onSubmit }) {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={false}
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button className="fs-4" variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button className="fs-4" onClick={onSubmit}>
                    Thêm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddForm;
