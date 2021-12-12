import React from 'react'
import style from './Attributes.module.css'

class Attributes extends React.Component {
    state = {}
    render() {
        return (
            <>
                {this.props.attributes.map(attribute => <React.Fragment key={attribute.id}>
                    <span className={style[this.props.attributeCN]}>{attribute.name}</span>
                    <div className={style[this.props.buttonsCN]}>
                        {attribute.items.map((button, index) =>
                            <button key={`${attribute.id}` + index} style={{ backgroundColor: button.value }}
                                onClick={() => this.setState({ ...this.state, [`${attribute.name}`]: `${attribute.id}` + index })}
                                id={this.state[`${attribute.name}`] == (`${attribute.id}` + index) ? attribute.type === 'swatch' ? style.activeColor : style[this.props.activeCN] : ""}
                                className={style[this.props.buttonCN]}>{attribute.type !== 'swatch' && button.value}</button>)}
                    </div></React.Fragment>)}
            </>
        )
    }
}

export default Attributes