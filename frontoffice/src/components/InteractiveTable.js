export default function InteractiveTable({history=[]}){

    return(
        <div className="InteractiveTable">
            <table>
                
                {sideBySide(history)}
                
            </table>
        </div>
    );



    function separateMoves(history){
        let moves = []
        for(let i = 0; i < history.length-2; i=i+2){
            moves.push([history[i],history[i+1]])
        }

        if((history.length % 2) != 0){
            moves.push([history[history.length-1], ''])
        }

        console.log(moves);
        return moves;
    }


    function sideBySide(history){
        let moves = separateMoves(history);
        return(
            <tbody>
                {
                    moves.map((row,i) => (
                        <tr key={i}>
                            {row.map((move,j)=>(
                                <td key={j}>{move}</td>
                            ))}
                        </tr>
                        ))
                }
            </tbody>
        );
    }       
    
}


