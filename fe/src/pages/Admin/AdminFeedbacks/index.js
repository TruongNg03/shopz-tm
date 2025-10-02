import './AdminFeedbacks.scss';
import { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import useDebounce from '~/hooks/useDebounce';
import * as httpRequest from '~/utils/httpRequest';

function AdminFeedbacks() {
    const [searchFeedback, setSearchFeedback] = useState('');
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const debouncedValue = useDebounce(searchFeedback, 500);

    useEffect(() => {
        async function getData() {
            const dataFeedbacks = await httpRequest.get(`feedbacks?search_input=${debouncedValue}`);

            console.log('all feedbacks:', dataFeedbacks);
            console.log('--------------------');

            if (dataFeedbacks.message) {
                setErrorMessage(dataFeedbacks.message);
                setAllFeedbacks([]);
            } else {
                setAllFeedbacks(dataFeedbacks.feedbacks);
                setErrorMessage('');
            }
        }

        getData();
    }, [debouncedValue]);

    return (
        <div className="admin-feedbacks">
            <h1 className="fs-1 fw-bold">Danh sách phản hồi</h1>
            <div className="admin-search d-flex gap-4 mt-4">
                <Form.Control
                    className="admin-search-label px-4 py-3 fs-3 rounded-4"
                    type="search"
                    placeholder="Tìm kiếm theo tên, email"
                    aria-label="Search"
                    onChange={(e) => {
                        setSearchFeedback(e.target.value);
                    }}
                />
            </div>

            <div className="admin-search-result mt-4 p-3 rounded-4 overflow-auto">
                <Table className="m-0 text-center" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allFeedbacks.length > 0 ? (
                            allFeedbacks.map((feedback, key) => {
                                return (
                                    <tr key={++key}>
                                        <td>{++key}</td>
                                        <td>{feedback.username}</td>
                                        <td>{feedback.email}</td>
                                        <td>{feedback.feedback}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={4}>
                                    {errorMessage || 'Chưa có phản hồi nào'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default AdminFeedbacks;
