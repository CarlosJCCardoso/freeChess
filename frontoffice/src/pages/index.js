import { useCallback, useState } from "react"
import {Chessboard} from "react-chessboard"
import { Chess } from "chess.js";
import Container from 'react-bootstrap/Container';
import InteractiveTable from "@/components/InteractiveTable";
import Selector from "@/components/Selector";



export default function Home() {
  const [FEN, setFEN] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const  handleKeyDown = useCallback((e) => {
    switch(e.key){   
      case 'ArrowRight':
        if(Object.keys(future).length > 0){
          game.move(future[0]);
          future.shift();
          setGame(game);
          setFEN(game.fen());
          setFuture(future);
        }
        break;
      case 'ArrowLeft':
        if(game.history().length > 0){
          const moves = game.history()
          future.unshift(moves.pop());
          game.undo();
          setGame(game);
          setFEN(game.fen());
          setFuture(future);
        }
        break;
      case 'ArrowUp':
        if(game.history().lenght > 0){
          setFuture(game.history());
          setGame(new Chess());
          setFEN(game.fen());
        }
        break;
      case 'ArrowDown':
        if(Object.keys(future).length > 0){
          for(const move of future){
            game.move(move);
          }
          setFuture([]);
          setGame(game);
          setHistory(game.history());
        }
        break;

      default:
        break;
  }},[game,history,FEN,future]);

  return (
    <div onKeyDown={(e) => handleKeyDown(e)} tabIndex="0" style={{ maxHeight: "50%", maxWidth: "33%" }}>
        <Container>
          <Chessboard position={FEN} onPieceDrop={onDrop}/>
          <Selector></Selector>
          <InteractiveTable history={history} onChange = {updateBoard}></InteractiveTable>
        </Container>
    </div>
  )

  function updateBoard(i,j){

  }

  function checkIllegalMove(move){
    const gameCopy = new Chess(FEN);
    let result;
    try{
      result = gameCopy.move(move);
    }
    catch(e){
      result = null;
    }
    return result;
  }

  // TODO create promotion selection
  function onDrop(sourceSquare, targetSquare) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    };

    let result = checkIllegalMove(move);

    // illegal move
    if (result === null) {
      return false;
    }
    else{
      game.move(move);
      setFEN(game.fen());
      setHistory(game.history());
      setFuture([]);
      return true;
    }
  }
}


