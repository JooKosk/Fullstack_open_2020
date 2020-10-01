import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


const Course = ({course}) => {
  return (
    <div>
      <Header course = {course} />
      <Content course = {course} />
      <Total   course = {course}/>
      </div>
  )
}

const Header = ({course}) => {
  return (
  <h1>{course.name}</h1>
  )
}

const Content = ({course}) => {
  return (
    <div>
        <Part course = {course} />
    </div>

  )
}

const Total = ({course}) => {
  let exercises = course.parts.map(part => part.exercises)
  let sum= exercises.reduce((a, b) => a + b, 0)

  return (
    <>
    <p>total of {sum} exercises</p>
    </>
  )
}

const Part = ({course}) => {
 const parts = course.parts.map(part => 
  <p key={part.id}>{part.name} {part.exercises}</p>)

  return (
    <>
      {parts}
    </>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
