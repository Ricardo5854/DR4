import { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { ...state, age: state.age + 1 }
    case 'DECREMENT': return { ...state, age: state.age - 1 }
    default: return state
  }
}

export default function Ex2() {
  const [user, dispatch] = useReducer(reducer, { name: 'Bob', age: 30 })

  return (
    <div className="wrap">
      <div className="card">
        <div className="f1">
          <div style={{ fontWeight: 500 }}>{user.name}</div>
          <div className="muted">{user.age} anos</div>
        </div>
        <button className="btn-suc" onClick={() => dispatch({ type: 'INCREMENT' })}>
          + Idade
        </button>
        <button className="btn-dan" onClick={() => dispatch({ type: 'DECREMENT' })}>
          − Idade
        </button>
      </div>
    </div>
  )
}
