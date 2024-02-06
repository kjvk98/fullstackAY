
const Header = ({name}) => {
 //   console.log(name)
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  const Part = ({part}) => {
 //   console.log(part)
    return (
      <div>
        <li>{part.name} {part.exercises}</li>
      </div>
    )
  }
  
  const Content = ({parts}) => {
 //   console.log(parts)
    return (
      <div>
        <ul>
          {parts.map(part => 
            <Part key={part.id} part={part} />
          )}
        </ul>
      </div>
    )
  }
  
  const Total = ({exercises}) => {
 //   console.log(exercises)
    return (
      <div>
        <p><b>Total of exercises {exercises.reduce((partialSum, a) => partialSum + a, 0)} </b> </p>
      </div>
    )
  }
  
  const Course = ({course}) => {
//    console.log(course)
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total exercises={course.parts.map(part  => 
            part.exercises 
          )} />
      </div>
    )
  }

  export default Course