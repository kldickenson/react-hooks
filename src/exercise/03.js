// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

//* Exercise
// function Name({name, onNameChange}) {
//   return (
//     <div>
//       <label htmlFor="name">Name: </label>
//       <input id="name" value={name} onChange={onNameChange} />
//     </div>
//   )
// }
//! EXTRA 1 - colocated state
function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={event => setName(event.target.value)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

//* Exercise
// 🐨 uncomment this
// function Display({name, animal}) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// }
 //! EXTRA 1 - colocated state, move state and onNameChange to Name()
function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}


//* Exercise
// function App() {
//   const [name, setName] = React.useState('')
//   // 🐨 add a useState for the animal
//   const [animal, setAnimal] = React.useState('')
//   return (
//     <form>
//       <Name name={name} onNameChange={event => setName(event.target.value)}/>
//       {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
//       <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
//       {/* 🐨 pass the animal prop here */}
//       <Display name={name} animal={animal} />
//     </form>
//   )
// }
 //! EXTRA 1 - colocated state, move state and onNameChange to Name()
function App({name}) {
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name name={name} />
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
      <Display animal={animal} />

    </form>
  )
}

export default App
