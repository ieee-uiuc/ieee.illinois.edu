import React, { useContext } from 'react'
import '../../../App.scss'
import './Board.scss'
import { DataContext } from '../../Context/GlobalContext'
import FadeIn from '../../../FadeIn'

const Board = () => {

    const state = useContext(DataContext)
    const [board] = state.board
    const [dataBoard] = state.dataBoard

    return (
        <div className="board">
            <div className="board__container">
                <h2 className="board__title">
                    IEEE Exec Board
                </h2>

                {dataBoard && <div className="board__person">
                    <FadeIn direction={'left'}>
                        <div className="board__person__card" key={'loading'}>
                            <div className="board__person__card__image">
                                <img className="board__person__card__img" src={'loading'} alt={'loading'} />
                            </div>
                            <p className="board__person__card__name">
                                {'loading'}
                            </p>
                            <i className="board__person__card__title">
                                {'loading'}
                            </i>
                            <p className="board__person__card__description">
                                {'loading'}
                            </p>
                        </div>
                    </FadeIn>
                </div>}

                {!dataBoard && <div className="board__person">
                    {board.map((item) => (
                        <FadeIn direction={'left'}>
                            <div className="board__person__card" key={item._id}>
                                <div className="board__person__card__image">
                                    <img className="board__person__card__img" src={item.images.url} alt={item._id} />
                                </div>
                                <p className="board__person__card__name">
                                    {item.name}
                                </p>
                                <i className="board__person__card__title">
                                    {item.title}
                                </i>
                                <p className="board__person__card__description">
                                    {item.description}
                                </p>
                            </div>
                        </FadeIn>

                    ))}
                </div>}
            </div>

        </div>
    )
}

export default Board