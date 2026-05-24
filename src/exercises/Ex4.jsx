import { useState, useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), name: action.name, age: action.age }]
    case 'INCREMENT':
      return state.map(u => u.id === action.id ? { ...u, age: u.age + 1 } : u)
    case 'DECREMENT':
      return state.map(u => u.id === action.id ? { ...u, age: Math.max(0, u.age - 1) } : u)
    case 'DELETE':
      return state.filter(u => u.id !== action.id)
    default:
      return state
  }
}

export default function Ex4() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [users, dispatch] = useReducer(reducer, [])

  const handleAdd = () => {
    if (!name.trim() || !age) return
    dispatch({ type: 'ADD', name: name.trim(), age: Number(age) })
    setName('')
    setAge('')
  }

  return (
    <div className="wrap">
      <div className="row">
        <input
          style={{ flex: '1 1 140px' }}
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          style={{ width: 80 }}
          placeholder="Idade"
          min="0"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <button className="btn-primary" onClick={handleAdd}>INSERIR</button>
      </div>

      {users.length === 0 && <p className="no-data">Nenhum usuário ainda.</p>}

      {users.map(u => (
        <div key={u.id} className="card">
          <div className="f1">
            <span style={{ fontWeight: 500 }}>{u.name}</span>
            <span className="muted"> — {u.age} anos</span>
          </div>
          <button className="btn-suc" onClick={() => dispatch({ type: 'INCREMENT', id: u.id })}>+</button>
          <button className="btn-dan" onClick={() => dispatch({ type: 'DECREMENT', id: u.id })}>−</button>
          <button className="btn-gray" onClick={() => dispatch({ type: 'DELETE', id: u.id })}>🗑</button>
        </div>
      ))}
    </div>
  )
}
