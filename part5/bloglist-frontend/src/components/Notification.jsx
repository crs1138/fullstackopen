import './notification.css'

const Notification = ({ message, type = '' }) => {
    return message ? (
        <div className={`notification notification--${type}`}>{message}</div>
    ) : null
}

export default Notification
