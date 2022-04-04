import React from "react";

const Header = ({ name }) => <h1>{name}</h1>
const Total = ({ sum }) => <p>total of {sum} exercises</p>
const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <>
            {parts.map((part)=> {
                return <Part key={part.id} part={part} />
            })}

            <Total sum={sum} />
        </>
    )
}
 

export default function Course({courses}) {
    return (
        <>
        {courses.map((course) => {
            return (
            <React.Fragment key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
            </React.Fragment>
            )
        })}
        </>
    )
}