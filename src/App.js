import { useState, useEffect, useCallback } from 'react';
import { MobileView, BrowserView, isMobile, isBrowser } from 'react-device-detect';
import Cell from './components/Cell';

function App() {

    const [boardSize, setBoardSize] = useState(20);
    const [board, setBoard] = useState([]);
    const [bombsNumber, setBombsNumber] = useState(0);
    const [condition, setCondition] = useState('Stop');
    const [showRules, setShowRules] = useState(false);
    const [activeMobileButton, setActiveMobileButton] = useState('Reveal');

    const setup = useCallback(() => {
        const newBoard = [];
        let bombs = 35;
        let placedBombs = 0;
        for (let i = 0; i < boardSize; i++) {
            const newLine = [];
            for (let x = 0; x < boardSize; x++) {
                let isBomb = false;
                let bombNumber = Math.floor(Math.random() * 20);
                // if (bombNumber < 2 && bombs > 0) { isBomb = true; placedBombs++; bombs--; }
                // if(x % 5 === 0 && i % 2 === 0) { isBomb = true}
                const newCell = { bomb: false, revealed: false, marked: false, empty: false }
                // console.log(newCell);
                newLine.push(newCell);
            }
            newBoard.push(newLine);
        }
        while (placedBombs < bombs) {
            let randomR = Math.floor(Math.random() * boardSize);
            let randomC = Math.floor(Math.random() * boardSize);
            if (!newBoard[randomR][randomC].bomb) {
                newBoard[randomR][randomC].bomb = true;
                placedBombs++;
            }
        }
        setCondition('Play');
        setBombsNumber(placedBombs);
        setBoard(newBoard);
    });

    const checkNeighbors = (r, c, directions) => {
        let bombs = 0;
        if (board[r][c].bomb) return 0;
        for (let rowOff = -1; rowOff <= 1; rowOff++) {
            for (let columnOff = -1; columnOff <= 1; columnOff++) {
                let newC = c + columnOff
                let newR = r + rowOff
                if (newC > -1 && newC < boardSize && newR > - 1 && newR < boardSize) {
                    if (board[newR][newC].bomb) bombs++;
                }
            }
        }
        // if (directions.top) {
        //     if (board[r-1][c].bomb) { bombs++; };
        // }
        // if (directions.topRight) {
        //     if (board[r-1][c+1].bomb) { bombs++; };
        // }
        // if (directions.right) {
        //     if (board[r][c+1].bomb) { bombs++; };
        // }
        // if (directions.bottomRight) {
        //     if (board[r+1][c+1].bomb) { bombs++; };
        // }
        // if (directions.bottom) {
        //     if (board[r+1][c].bomb) { bombs++; };
        // }
        // if (directions.bottomLeft) {
        //     if (board[r+1][c-1].bomb) { bombs++; };
        // }
        // if (directions.left) {
        //     if (board[r][c-1].bomb) { bombs++; };
        // }
        // if (directions.topLeft) {
        //     if (board[r-1][c-1].bomb) { bombs++; };
        // }

        return bombs;
    }

    const getCellDirections = (r, c) => {
        const directions = {
            topLeft: true,
            top: true,
            topRight: true,
            right: true,
            bottomRight: true,
            bottom: true,
            bottomLeft: true,
            left: true,
        };
        if (r === 0) {
            directions.topLeft = false;
            directions.top = false;
            directions.topRight = false;

        }
        if (r === boardSize - 1) {
            directions.bottomLeft = false;
            directions.bottom = false;
            directions.bottomRight = false;
        }
        if (c === 0) {
            directions.topLeft = false;
            directions.left = false;
            directions.bottomLeft = false;
        }
        if (c === boardSize - 1) {
            directions.topRight = false;
            directions.right = false;
            directions.bottomRight = false;
        }
        return directions;
    }

    const revealCell = (r, c, directions, newBoard) => {
        let actualCell = newBoard[r][c];
        if (actualCell && !actualCell.revaled && !actualCell.bomb) {
            actualCell.revealed = true;
        }
        if (actualCell.empty) {
            if (directions.topLeft) {
                const inscpectCell = newBoard[r - 1][c - 1];
                if (!inscpectCell.revealed && !inscpectCell.bomb) {
                    const inspectDirections = getCellDirections(r - 1, c - 1);
                    revealCell(r - 1, c - 1, inspectDirections, newBoard);
                }
            }
            if (directions.top) {
                const inscpectCell = newBoard[r - 1][c];
                if (!inscpectCell.revealed && !inscpectCell.bomb) {
                    const inspectDirections = getCellDirections(r - 1, c);
                    revealCell(r - 1, c, inspectDirections, newBoard);
                }
            }
            if (directions.topRight) {
                const inscpectCell = newBoard[r - 1][c + 1];
                if (!inscpectCell.revealed && !inscpectCell.bomb) {
                    const inspectDirections = getCellDirections(r - 1, c + 1);
                    revealCell(r - 1, c + 1, inspectDirections, newBoard);
                }
            }
            if (directions.right) {
                const inscpectCell = newBoard[r][c + 1];
                if (!inscpectCell.revealed && !inscpectCell.bomb) {
                    const inspectDirections = getCellDirections(r, c + 1);
                    revealCell(r, c + 1, inspectDirections, newBoard);
                }
            }
            if (directions.bottomRight) {
                const inscpectCell = newBoard[r + 1][c + 1];
                if (!inscpectCell.revealed && !inscpectCell.bomb) {
                    const inspectDirections = getCellDirections(r + 1, c + 1);
                    revealCell(r + 1, c + 1, inspectDirections, newBoard);
                }
            }
            if (directions.bottom) {
                const inscpectCell = newBoard[r + 1][c];
                if (!inscpectCell.revealed && !inscpectCell.bomb) {
                    const inspectDirections = getCellDirections(r + 1, c);
                    // console.log(inspectDirections);
                    revealCell(r + 1, c, inspectDirections, newBoard);
                }
            }
            if (directions.bottomLeft) {
                const inscpectCell = newBoard[r + 1][c - 1];
                if (!inscpectCell.revealed && !inscpectCell.bomb) {
                    const inspectDirections = getCellDirections(r + 1, c - 1);
                    revealCell(r + 1, c - 1, inspectDirections, newBoard);
                }
            }
            if (directions.left) {
                const inscpectCell = newBoard[r][c - 1];
                if (!inscpectCell.revealed && !inscpectCell.bomb) {
                    const inspectDirections = getCellDirections(r, c - 1);
                    revealCell(r, c - 1, inspectDirections, newBoard);
                }
            }
        }
        return newBoard;
    }

    const checkedFoundBombs = (newBoard) => {
        let foundBombs = 0;
        newBoard.map(row => {
            row.map(cell => {
                if (cell.bomb && cell.marked) foundBombs++;
            })
        });
        return foundBombs;
    }

    const checkedPlacedMarkers = (newBoard) => {
        let markedCells = 0;
        newBoard.map(row => {
            row.map(cell => {
                if (cell.marked) markedCells++;
            })
        });
        return markedCells;
    }

    const revealAllCell = () => {
        const newBoard = [...board];
        newBoard.map(row => {
            row.map(cell => {
                cell.revealed = true;
            });
        });
        setBoard(newBoard);
    }

    const checkAllRevealed = () => {
        let unRevealed = 0;
        let array = [];
        board.map(row => row.map(cell => {
            if (!cell.revealed) { unRevealed++; array.push(cell) }
        }));
        array = array.filter(cell => cell.bomb);
        console.log('array', array);
        console.log(unRevealed - array.length);
        return unRevealed - array.length;
    }

    const cellClickHandler = (e, r, c, directions) => {
        let newBoard = [...board];
        let foundBombs = 0;
        if (e.ctrlKey || (isMobile && activeMobileButton === 'Flag')) {
            if (!newBoard[r][c].marked) {
                const placedMarkers = checkedPlacedMarkers(newBoard);
                if (placedMarkers < bombsNumber) {
                    newBoard[r][c].marked = true;
                    foundBombs = checkedFoundBombs(newBoard);
                }
            } else {
                newBoard[r][c].marked = false
            }
            setBoard(newBoard);
        }
        else if (!e.crtlKey && newBoard && newBoard.length > 0) {
            if (newBoard[r][c].bomb) {
                setCondition('Lost');
                revealAllCell();
            } else {
                const test = revealCell(r, c, directions, newBoard);
                setBoard(test);
            }
        }
        let allRevealed = checkAllRevealed();
        foundBombs = checkedFoundBombs(newBoard);
        if (foundBombs === bombsNumber && allRevealed === 0) {
            setCondition('Win');
            revealAllCell();
        }
    }

    return (
        <div className="container">
            <div className={`rules-opener${showRules ? ' show' : '' }`} onClick={() => setShowRules(!showRules)}>
                <i className="fa-solid fa-circle-info"></i>
            </div>
            <div className={`rules${showRules ? ' show' : ''}` }>
                <h3>Rules</h3>
                <ul>
                    <li>If you find an empty cell then will reveal all neighbors empty cells until it reach a cell contains number.</li>
                    <li>The number in the cell means how many bombs are in the neighbors of the revealed cell.</li>
                    <li>if you reveal a bomb, all cells are revealed and you lost the game.</li>
                    <li>You have to reveal or mark all cells to win the game.</li>
                </ul>
                <h3>Controls</h3>
                <ul>
                    <li>You can reveal a cell with mouse left click on it.</li>
                    <li>If you think the cell contain bomb you can press the <span>'Ctrl'</span> button when left click to mark the cell with a flag.</li>
                    <li>If you revealed all non-bomb cells and marked all bomb cells you won the game.</li>
                </ul>
            </div>
            <h3>Sipizork's minesweeper</h3>
            <div className="infos">
                {condition !== 'Play' ? <button onClick={() => setup()}>Start Again</button> : ''}
                {condition === 'Win' || condition === 'Lost' ? <p>{condition}</p> : ''}
                {condition === 'Play' ? <p>Remaining Flags: {bombsNumber - checkedPlacedMarkers(board)}</p> : ''}
            </div>
            {board.length > 0 ? (
                <div className="board" style={{ gridTemplateColumns: `repeat(${boardSize}, ${isMobile ? `calc(100vw / ${boardSize}))` : '40px' }` }}>
                    {board.map((row, r) => {
                        return row.map((cell, c) => {
                            const directions = getCellDirections(r, c);
                            const neighbors = checkNeighbors(r, c, directions);
                            if (neighbors <= 0 && !cell.bomb) cell.empty = true;
                            return <Cell onClick={cellClickHandler} condition={condition} bomb={cell.bomb} key={c} neighbors={neighbors} revealed={cell.revealed} marked={cell.marked} r={r} c={c} directions={directions} boardSize={boardSize} isMobile={isMobile} />;
                        });
                    })}
                </div>
            ) : ''}
            <MobileView>
                <div className="mobile-controls">
                    <div onClick={() => setActiveMobileButton('Reveal')} className={`reveal ${activeMobileButton === 'Reveal' ? ' active' : ''}`}><i class="fa-regular fa-eye"></i></div>
                    <div onClick={() => setActiveMobileButton('Flag')} className={`flag ${activeMobileButton === 'Flag' ? ' active' : ''}`}><i className="fa-solid fa-flag"></i></div>
                </div>
            </MobileView>
        </div>
);
}

export default App;
