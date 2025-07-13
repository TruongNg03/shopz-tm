import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import './SpecificationProduct.scss';
import ProductItem from '~/components/ProductItem';
import images from '~/assets/images';
import { Button } from 'react-bootstrap';

// example
const productItem = {
    linkImg: images.introduction1,
    title: 'Title',
    text: 'Text',
    linkTo: '/#',
    price: '10',
    status: 'Có hàng',
    nameProduct: 'AN-515',
    contentProduct: [
        'Windows 11 Home SL',
        'CPU Intel® Core™ Ultra 7 Processor 155H',
        'Card đồ họa NVIDIA® GeForce RTX™ 4060',
    ],
    detailProduct: [
        'Hệ điều hành : Windows 11 Home',
        'Kiến trúc hệ điều hành : 64-bit',
        'Nhà sản xuất : Intel',
        'Dòng CPU : Core™ i3',
        'Số hiệu CPU : Intel® Core™ i3-1215U, 6 nhân 8 luồng',
        'Tốc độ xung nhịp : 1.2 GHz - 4.4 GHz',
        'Bộ nhớ trang bị sẵn : 8GB',
    ],
    overview: 'abcd',
};

function SpecificationProduct() {
    return (
        <div className="specification-product container">
            <ProductItem product={productItem} />

            <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="mb-3">
                <Tab className="mt-5" eventKey="home" title="Chi tiết">
                    <ul className="detail-product fs-4 py-3">
                        {productItem.detailProduct.map((info, key) => (
                            <li key={key++}>{info}</li>
                        ))}
                    </ul>
                </Tab>
                <Tab className="mt-5" eventKey="profile" title="Đánh giá">
                    <Form className="form-review">
                        <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                            <Form.Label className="fs-4 fw-bold">Bí danh</Form.Label>
                            <Form.Control className="fs-4" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="fs-4 fw-bold">Đánh giá</Form.Label>
                            <Form.Control className="fs-4" as="textarea" rows={5} />
                        </Form.Group>
                        <Button className="view-specification-btn py-2 px-4 fs-4 fw-bold rounded-5">
                            Gửi đánh giá
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        </div>
    );
}

export default SpecificationProduct;
