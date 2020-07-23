import React from 'react'
import axios from 'axios'
import Board from '../components/boards/Board';
import BoardForm from '../components/boards/BoardForm'

const BoardContext = React.createContext();
export const BoardConsumer = BoardContext.Consumer;

export class BoardProvider extends React.Component {
  state = { board: null, };

  getBoard = (boardId) => {
    axios.get(`/api/boards/${boardId}`)
      .then(res => {
        this.setState({board: res.data })
      })
      .catch(res => {
        console.log("error")
      })
  }

  setBoard = (board) => {
    this.setState({board: board})
  }

  updateBoard = (board) => {
    let data = new FormData()
    data.append('file', board.file)
    axios.put(`/api/boards/${board.id}?name=${board.name}&description=${board.description}&public=${board.public}`, data)
        .then(res => {
      this.setState({board:res.data}) //we then push the updated board to our state
        })
  }



  render() {
    return (
      <BoardContext.Provider value = {{
        ...this.state,
        getBoard: this.getBoard,
        setBoard: this.setBoard,
      }}>
        {this.props.children}
      </BoardContext.Provider>
    )
  }
}

