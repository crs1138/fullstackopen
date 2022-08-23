import { useState, forwardRef, useImperativeHandle } from 'react'
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
                <button type="button" onClick={toggleVisibility}>
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button type="button" onClick={toggleVisibility}>
                    Cancel
                </button>
            </div>
        </div>
    )
})

export default Toggable
