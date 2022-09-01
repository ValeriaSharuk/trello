import React, {useState} from "react";
import './App.css';

function App() {
  const [boards, setBoards] = useState([
    {id: 1, title: "Сделать", items: [{id:1, title: "Пойти в магазин"}, {id:2, title: "Выкинуть мусор"}, {id:3, title: "Прибраться"}]},
    {id: 2, title: "Проверить", items: [{id:4, title: "Пойти в магазин"}, {id:5, title: "Выкинуть мусор"}, {id:6, title: "Прибраться"}]},
    {id: 3, title: "Сделано", items: [{id:7, title: "Пойти в магазин"}, {id:8, title: "Выкинуть мусор"}, {id:9, title: "Прибраться"}]}
  ])

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className == 'item'){
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }


    function dragStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e,board,item) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if(b.id === board.id){
                return board
            }
            if(b.id === currentBoard.id){
                return currentBoard
            }
            return b
            }
        ))
        e.target.style.boxShadow = 'none'
    }

    return (
      <div className="App">
        {boards.map(board =>
            <div className='board'>
              <div className='board__title'>{board.title}</div>
              {board.items.map(item =>
                  <div className='item'
                       onDragOver={(e) => dragOverHandler(e)}
                       onDragLeave={e => dragLeaveHandler(e)}
                       onDragStart={(e) => dragStartHandler(e, board, item)}
                       onDragEnd={(e) => dragEndHandler(e)}
                       onDrop={(e) => dropHandler(e,board,item)}
                       draggable={true}
                  >{
                      item.title}
                  </div>
              )}
                  </div>
              )}
            </div>
        );
        };

export default App;
