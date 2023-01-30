import { useState } from "react"
import {Chessboard} from "react-chessboard"
import { Chess } from "chess.js";
import Container from 'react-bootstrap/Container';
import InteractiveTable from "@/components/InteractiveTable";
import Selector from "@/components/Selector";



export default function Home() {
  const [FEN, setFEN] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([]);



  return (
    <div style={{ maxHeight: "50%", maxWidth: "33%" }}>
        <Container>
          <Chessboard position={FEN} onPieceDrop={onDrop}/>
          <Selector></Selector>
          <InteractiveTable history={history}></InteractiveTable>
        </Container>
    </div>
  )

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
      setHistory(game.history())
      return true;
    }
  }
}


