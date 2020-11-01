import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type:'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type:'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type:'ZERO'
    })
  }

  const sum = store.getState().bad + store.getState().good + store.getState().ok
  const weights = store.getState().good * 1 + store.getState().ok * 0 + store.getState().bad * -1
  if (sum <= 0) {
    return (
      <div>
        <h1>Please provice feedback!</h1>
        <button onClick={good}>good</button> 
        <button onClick ={neutral}>neutral</button> 
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Please provice feedback!</h1>
        <button onClick={good}>good</button> 
        <button onClick ={neutral}>neutral</button> 
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>
        <h2>Statistics</h2>
        <div>good {store.getState().good}</div>
        <div>neutral {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
        <div>all {sum}</div>
        <div>average {weights/sum} </div>
        <div>positive {(store.getState().good * 1 /sum) * 100} %</div>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
