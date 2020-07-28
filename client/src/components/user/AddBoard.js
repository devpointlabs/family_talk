import React, { useState } from 'react';
import BoardForm from '../boards/BoardForm';
import { Modal, Button } from 'semantic-ui-react';

const AddBoard = (props) => {
  const [showForm, setShowForm] = useState(false)
  

  return (
    <>
    <Modal trigger={<Button color="grey">Add Board</Button>}>
  <BoardForm Create={true} toggleForm={setShowForm} />
  </Modal>
    </>
  )
 
}

export default AddBoard

// return (
//   <>
//   {showForm && <BoardForm Create={true} toggleForm={setShowForm} />}
//     <br/>
//     <button onClick={() => setShowForm(!showForm)}>
//       {showForm ? "Close Form" : "Add Board"}
//     </button>
//   </>
// )
