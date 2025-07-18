import './AdminFeedbacks.scss';
import { Table } from 'react-bootstrap';

const LIST_FEEDBACKS = [
    { username: 'name1', email: 'abc1@gmail.com', feedback: 'feedback1' },
    { username: 'name2', email: 'abc2@gmail.com', feedback: 'feedback3' },
    { username: 'name3', email: 'abc3@gmail.com', feedback: 'feedback2' },
];

function AdminFeedbacks() {
    return (
        <div className="admin-feedbacks">
            <h1 className="fs-1 fw-bold">Danh sách phản hồi</h1>
            <div className="admin-feedback-result mt-4 p-3 rounded-4 overflow-auto">
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
                        {LIST_FEEDBACKS.length > 0 ? (
                            LIST_FEEDBACKS.map((feedback, key) => {
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
                                    Chưa có phản hồi nào
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
