import React from 'react'
import axios from 'axios'
import Board from '../components/boards/Board';

const BoardContext = React.createContext();
export const BoardConsumer = BoardContext.Consumer;

export class BoardProvider extends React.Component {
  state = { board: null, };

  getBoard = (boardId) => {
    axios.get(`api/boards/${boardId}`)
      .then(res => {
        this.setState({board: res.data, })
      })
      .catch(res => {
        console.log("error")
      })
  }

  render() {
    return (
      <BoardContext.Provider value = {{
        ...this.state,
        getBoard: this.getBoard,
      }}>
        {this.props.children}
      </BoardContext.Provider>
    )
  }
}

