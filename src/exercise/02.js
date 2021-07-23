// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

//! EXTRA 3
// function useLocalStorageState(key, defaultValue= '') {
//   const [state, setState] = React.useState(
//     () => window.localStorage.getItem(key) || defaultValue,
//   )
//   React.useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [key, state])
//   return [state, setState]
// }
//* EXTRA 4
function useLocalStorageState(
  key,
  defaultValue= '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
  ) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  //! EXTRA 3
  // React.useEffect(() => {
  //   window.localStorage.setItem(key, state)
  // }, [key, state])

  //* EXTRA 4
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  //* Exercise
  // const [name, setName] = React.useState(
  //   window.localStorage.getItem('name') || initialName,
  // )
  //? EXTRA 1
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') || initialName,
  // )
  //! EXTRA 3
  const [name, setName] = useLocalStorageState('name', initialName)


  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  //* Exercise
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // })
  //todo EXTRA 2
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])


  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
