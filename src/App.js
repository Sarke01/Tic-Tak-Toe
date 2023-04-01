import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css"
import Square from "./components/Square";
import {Patterns} from "./Patterns"

function App() {

  const [board,setBoard]=useState(["","","","","","","","","",])
  const [player,setPlayer]=useState("X")
  const [result,setResult]=useState({winner:"none",state :"none"})

   function chooseSquare(square){
    setBoard(board.map((val,i)=>{
      if(i===square && val===""){
        return player
      }
      else return val;
    }))

    if(player==="X"){
      setPlayer("O")
    }
    else{
      setPlayer("X")
    }
  }

  function checkWin(){
     Patterns.forEach((currPattern)=>{
      const firstPlayer=board[currPattern[0]]
      if(firstPlayer=="") return;
      let foundWinner=true;
      currPattern.forEach((idx)=>{
        if(board[idx] !==firstPlayer){
          foundWinner=false;
        }
      })
      if(foundWinner){
        setResult({winner:player==="X"? "O" :"X",state:"won"})
      }
     })
  }

  function checkTie(){
    let tie=true;
    board.forEach((square)=>{
      if(square==""){
        tie=false;
      }
    })

    if(tie){
      setResult({winner:"No One",state:"Tie"})
    }
  }

  useLayoutEffect(()=>{
    checkTie()
    checkWin()
    
  },[board])

  useEffect(()=>{
    if(result.state !="none")
    alert(`Game finished ! Winning player :${result.winner}`)
  },[result])

  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square value={board[0]} chooseSquare={()=>{chooseSquare(0)}}></Square>
          <Square value={board[1]} chooseSquare={()=>{chooseSquare(1)}}></Square>
          <Square value={board[2]} chooseSquare={()=>{chooseSquare(2)}}></Square>
        </div>
        <div className="row">
          <Square value={board[3]} chooseSquare={()=>{chooseSquare(3)}}></Square>
          <Square value={board[4]} chooseSquare={()=>{chooseSquare(4)}}></Square>
          <Square value={board[5]} chooseSquare={()=>{chooseSquare(5)}}></Square>
        </div>
        <div className="row">
          <Square value={board[6]} chooseSquare={()=>{chooseSquare(6)}}></Square>
          <Square value={board[7]} chooseSquare={()=>{chooseSquare(7)}}></Square>
          <Square value={board[8]} chooseSquare={()=>{chooseSquare(8)}}></Square>
        </div>
      </div>
    </div>
  );
}

export default App;
