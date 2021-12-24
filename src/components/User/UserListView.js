import { Form, ListGroup } from 'react-bootstrap';
import ItemView from './ItemView';

const UserListView = ({users, deleteUser,handleSelect, selectedList}) => {

    const onSelect = (value, index)=>{
        selectedList[index] = value;
        handleSelect(selectedList)
        console.log("selectedList.length");
        console.log(selectedList.length);
        console.log(selectedList);
        console.log("index");
        console.log(index);
    }
    
    return (


<div className="justify-centent-center">
    {
        <ListGroup className="center" style={{ width: 1050 }}>
            {
                 users.map((user, index) => (
                    <div className="d-flex align-items-center justify-content-center ml-5 mr-5">
                                    <Form.Group controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" style={{transform:"scale(2)"}}
                                                 
                                                 checked={selectedList[index]}
                                                 onClick={
                                                    (event)=> onSelect(event.target.checked, index)}
                                                />
                                            </Form.Group>
                    
                                            <ItemView user = {user} deleteUser = {deleteUser} />
                    
            
                        </div>
                ))
            }
        </ListGroup>
    }
</div>

    );
};

export default UserListView;