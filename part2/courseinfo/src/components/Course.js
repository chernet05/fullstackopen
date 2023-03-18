import React from 'react'
const Header = ({ name }) => <h1>{name}</h1>
const Total = ({ sum }) => <h3>total of {sum} exercises</h3>

const Part = ({ part }) =>
    <div >
        <p>
            {part.name} {part.exercises}
        </p>
    </div>

const Content = ({ parts }) => {
    const reduced = (parts) => { return (parts.reduce((all, parts) => (all + parts.exercises), 0)) }
    return (
        <>
            {parts.map((part) => {
                return (<Part key={part.id} part={part} />)
            })}
            <Total sum={reduced(parts)} />
        </>
    )
}
const Courses = ({ data }) => {
    return (
        data.map((course) => {
            return (<div key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
            </div>)
        }))
}
function Course({ courses }) {


    return (
        <>
            <h1>Web development Curriculum </h1>
            <Courses data={courses} />
        </>

    )
}
export default Course;