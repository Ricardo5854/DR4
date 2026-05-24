import { useState, useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text }]
    case 'DELETE':
      return state.filter(t => t.id !== action.id)
    default:
      return state
  }
}

export default function Ex5() {
  const [value, setValue] = useState('')
  const [todos, dispatch] = useReducer(reducer, [])

  const handleAdd = () => {
    if (!value.trim()) return
    dispatch({ type: 'ADD', text: value.trim() })
    setValue('')
  }

  return (
    <div className="wrap">
      <div className="row">
        <input
          className="f1"
          placeholder="Nova tarefa..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button className="btn-primary" onClick={handleAdd}>Adicionar</button>
      </div>

      {todos.length === 0 && <p className="no-data">Nenhuma tarefa ainda.</p>}

      {todos.map(t => (
        <div key={t.id} className="card">
          <span className="f1">{t.text}</span>
          <button className="btn-dan" onClick={() => dispatch({ type: 'DELETE', id: t.id })}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}
