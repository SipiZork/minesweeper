import '../styles/cell.scss'; 

const Cell = ({ bomb, condition, neighbors, revealed, marked, onClick, r, c, directions, boardSize, isMobile }) => {

    return (
        <div className='cell' onClick={(e) => onClick(e, r,c, directions)} style={{ width: `${isMobile ? `calc(100vw / ${boardSize})` : '40px'}`, height: `${isMobile ? `calc(100vw / ${boardSize})` : '40px'}` }}>
            {marked && condition === 'Play' ? <p className="flag"><i class="fa-solid fa-flag"></i></p> : revealed ? bomb ? <p class="bomb"><i className="fa-solid fa-bomb"></i></p> :  neighbors > 0 ? <p class={`numbers nighbors-${neighbors}`}>{neighbors}</p> : <p className="empty-revealed"></p> : ''}
        </div>
)
}

export default Cell;