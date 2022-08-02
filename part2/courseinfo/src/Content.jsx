import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => {
    const total = parts.reduce((acc, { exercises }) => acc + exercises, 0)

    return parts?.length > 0 ? (
        <div>
            <div>
                {parts.map((partData) => {
                    const { name, exercises, id } = partData
                    return <Part name={name} exercises={exercises} key={id} />
                })}
            </div>
            <Total total={total} />
        </div>
    ) : (
        <p>No parts for this course provided.</p>
    )
}
export default Content
