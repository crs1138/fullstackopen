import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef(({ children, buttonLabel }, refs) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    useImperativeHandle(refs, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button type="button" onClick={toggleVisibility}>
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {children}{' '}
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
