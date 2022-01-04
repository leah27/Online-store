import React from 'react'
import style from './Attributes.module.css'

class Attributes extends React.Component {
    render() {
        const { attributes, activeCN, productKey } = this.props
        return (
            <>
                {attributes.map(attribute => <React.Fragment key={attribute.id}>
                    <div>
                        {attribute.items.map((button, index) =>
                            <button key={`${attribute.id}` + index} style={{ backgroundColor: button.value }}
                                id={productKey.includes(attribute.id.replace(/\s/g, '') + index) ? attribute.type === 'swatch' ? style.activeColor : style[activeCN] : ""}
                            >{attribute.type !== 'swatch' && button.value}</button>)}
                    </div></React.Fragment>)}
            </>
        )
    }
}

export default Attributes