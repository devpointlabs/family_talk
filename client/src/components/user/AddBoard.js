import React, { useState } from 'react';
import BoardForm from '../boards/BoardForm';
import { Modal } from 'semantic-ui-react';

const AddBoard = (props) => {
  const [showForm, setShowForm] = useState(false)
  

  return (
    <>
    <Modal trigger={<button>Add Board</button>}>
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
