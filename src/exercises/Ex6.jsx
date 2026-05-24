import { useState, useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, done: false }]
    case 'DELETE':
      return state.filter(t => t.id !== action.id)
    case 'TOGGLE':
      return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t)
    default:
      return state
  }
}

export default function Ex6() {
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
        <div key={t.id} className={t.done ? 'card done' : 'card'}>
          <span
            className="f1"
            style={{
              textDecoration: t.done ? 'line-through' : 'none',
              color: t.done ? '#aaa' : 'inherit',
            }}
          >
            {t.text}
          </span>
          <button
            className={t.done ? 'btn-yel' : 'btn-suc'}
            onClick={() => dispatch({ type: 'TOGGLE', id: t.id })}
          >
            {t.done ? 'Desfazer' : '✓ Feito'}
          </button>
          <button className="btn-dan" onClick={() => dispatch({ type: 'DELETE', id: t.id })}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}
