import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props, refs) => {
    const { children, buttonLabel } = props
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button
                    type="button"
                    onClick={toggleVisibility}
                    data-cy="login"
                >
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible} data-testid="toggableContent">
                {children}
                <button type="button" onClick={toggleVisibility}>
                    Cancel
                </button>
            </div>
        </div>
    )
})

Toggable.displayName = 'Toggable'
Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}
export default Toggable
