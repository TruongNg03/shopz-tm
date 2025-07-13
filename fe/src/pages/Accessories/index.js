import Body from '~/Layout/components/Body';
import images from '~/assets/images';

//example data
const EXAMPLE_DATA = [
    {
        linkImg: images.introduction1,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Có hàng',
        nameProduct: 'AN-515',
        contentProduct: ['line 1', 'line 2'],
    },
    {
        linkImg: images.introduction2,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Có hàng',
        nameProduct: 'AN-515',
        contentProduct: ['line 1', 'line 2'],
    },
    {
        linkImg: images.introduction3,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Hết hàng',
        nameProduct: 'AN-515',
        contentProduct: ['line 1', 'line 2'],
    },
    {
        linkImg: images.introduction4,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Có hàng',
        nameProduct: 'AN-515',
        contentProduct: ['line 1', 'line 2'],
    },
    {
        linkImg: images.introduction4,
        title: 'Title',
        text: 'Text',
        linkTo: '/#',
        price: '10',
        status: 'Hết hàng',
        nameProduct: 'AN-515',
        contentProduct: ['line 1', 'line 2'],
    },
];

function Accessories() {
    return <Body title={'Phụ kiện'} dataProducts={EXAMPLE_DATA} />;
}

export default Accessories;
