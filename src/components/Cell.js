import '../styles/cell.scss'; 

const Cell = ({ bomb, neighbors, revealed, marked, onClick, r, c, directions }) => {

    return (
        <div className='cell' onClick={(e) => onClick(e, r,c, directions)}>
            {marked ? <p className="flag"><i class="fa-solid fa-flag"></i></p> : revealed ? bomb ? <p class="bomb"><i className="fa-solid fa-bomb"></i></p> :  neighbors > 0 ? <p class={`numbers nighbors-${neighbors}`}>{neighbors}</p> : <p className="empty-revealed"></p> : ''}
        </div>
)
}

export default Cell;