import ReactDOM from 'react-dom'
import React, { Component } from 'react'

export class Popup extends Component {

    render() {
        return ReactDOM.createPortal(

            <div className={this.props.isOpen ? 'show' : 'hidden'}>
                <div className="card">
                    <div className='card__title'>{this.props.title}</div>
                    <div className='card__date'><i>{this.props.date}</i></div>
                    <div className='card__location'><i>{this.props.location}</i></div>
                    <div className='card__image'><img src={this.props.image} alt={this.props.id} /></div>
                    <div className='card__description'>{this.props.description}</div>
                    <button onClick={() => { this.props.setIsOpen(false) }} className='card__button'>x</button>
                    <img src={this.props.image} id={this.props.id} alt={this.props.id} className="card__background" />
                </div>
            </div>,
            document.body)
    }
}

export default Popup

