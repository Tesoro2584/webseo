import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { RotateCcw, Monitor, User } from 'lucide-react';

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [playVsBot, setPlayVsBot] = useState(true);

  // Helper to safely update game state
  const safeGameMutate = (modify: (g: Chess) => void) => {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  };

  // Make a random move for the bot
  const makeRandomMove = () => {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves[randomIndex];
    
    setTimeout(() => {
      safeGameMutate((g) => {
        g.move(move);
      });
      setMoveHistory(game.history());
    }, 300);
  };

  // Trigger bot move if it's black's turn and playing vs bot
  useEffect(() => {
    if (playVsBot && game.turn() === 'b') {
      makeRandomMove();
    }
    setMoveHistory(game.history());
  }, [game.fen(), playVsBot]);

  // Handle human move
  function onDrop({ sourceSquare, targetSquare }: { sourceSquare: string, targetSquare: string | null }) {
    if (!targetSquare) return false;
    let move = null;
    safeGameMutate((g) => {
      try {
        move = g.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q', // always promote to a queen for simplicity
        });
      } catch (e) {
        // invalid move
      }
    });
    
    if (move === null) return false;
    
    return true;
  }

  // Reset the game
  const resetGame = () => {
    setGame(new Chess());
    setMoveHistory([]);
  };

  // Status message
  let status = '';
  if (game.isCheckmate()) {
    status = `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`;
  } else if (game.isDraw()) {
    status = 'Draw!';
  } else if (game.isCheck()) {
    status = 'Check!';
  } else {
    status = `${game.turn() === 'w' ? 'White' : 'Black'}'s Turn`;
  }

  return (
    <div className="game-layout">
      <div className="board-container">
        <Chessboard 
          options={{
            position: game.fen(),
            onPieceDrop: onDrop,
            darkSquareStyle: { backgroundColor: '#2b313c' },
            lightSquareStyle: { backgroundColor: '#4a5568' }
          }}
        />
      </div>

      <div className="panel">
        <div>
          <div className={`status-badge ${game.turn() === 'w' ? 'white' : 'black'}`}>
            {status}
          </div>
          
          <div className="btn-group">
            <button className="btn" onClick={() => { resetGame(); setPlayVsBot(!playVsBot); }}>
              {playVsBot ? <User size={20}/> : <Monitor size={20}/>}
              Mode: {playVsBot ? 'Vs Bot' : 'Pass & Play'}
            </button>
            <button className="btn secondary" onClick={resetGame}>
              <RotateCcw size={20} /> Reset Game
            </button>
          </div>
        </div>

        {moveHistory.length > 0 && (
          <div className="history-container">
            <div className="history-title">Move History</div>
            <div className="history-list">
              {moveHistory.map((move, index) => (
                <div key={index} className="history-item">
                  {index % 2 === 0 ? `${Math.floor(index / 2) + 1}. ` : ''}{move}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
