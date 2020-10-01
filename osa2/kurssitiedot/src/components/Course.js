import React from 'react'

const Course = ({course}) => (
    <div>
      <Header name={course.name}/>
      <Content parts = {course.parts} />
      <Total course = {course} />
    </div>
  )

const Header = ({name}) => (
  <h2>{name}</h2>
)

const Content = ({parts}) => (
    <div>
         {parts.map(part => 
          <Part key={part.id} name = {part.name} exercises = {part.exercises}/>)}
    </div>
  )

const Total = ({course}) => {
  let exercises = course.parts.map(part => part.exercises)
  let sum= exercises.reduce((a, b) => a + b, 0)

  return (
    <>
    <p><strong>total of {sum} exercises</strong></p>
    </>
  )
}

const Part = ({name, exercises}) => (
    <p>
      {name} {exercises}
    </p>
  )

  export default Course