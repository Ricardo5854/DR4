import { useState } from 'react'
import Ex1 from './exercises/Ex1'
import Ex2 from './exercises/Ex2'
import Ex3 from './exercises/Ex3'
import Ex4 from './exercises/Ex4'
import Ex5 from './exercises/Ex5'
import Ex6 from './exercises/Ex6'
import Ex7 from './exercises/Ex7'
import Ex8 from './exercises/Ex8'
import Ex9 from './exercises/Ex9'
import Ex10 from './exercises/Ex10'
import Ex11 from './exercises/Ex11'
import Ex12 from './exercises/Ex12'
import Ex13 from './exercises/Ex13'
import Ex14 from './exercises/Ex14'
import Ex15 from './exercises/Ex15'
import Ex16 from './exercises/Ex16'

const exercises = [
  { id: 1,  label: 'useState: User',                  tag: 'useState',               component: Ex1  },
  { id: 2,  label: 'useReducer: User',                tag: 'useReducer',             component: Ex2  },
  { id: 3,  label: 'Reducer: Lista',                  tag: 'useReducer',             component: Ex3  },
  { id: 4,  label: 'Lista + Delete',                  tag: 'useReducer',             component: Ex4  },
  { id: 5,  label: 'TODO List',                       tag: 'useState + useReducer',  component: Ex5  },
  { id: 6,  label: 'TODO + Riscar',                   tag: 'estilos condicionais',   component: Ex6  },
  { id: 7,  label: 'Fatorial',                        tag: 'useMemo',                component: Ex7  },
  { id: 8,  label: 'Filter startsWith (nome)',        tag: 'useMemo',                component: Ex8  },
  { id: 9,  label: 'Filter includes (nome)',          tag: 'useMemo',                component: Ex9  },
  { id: 10, label: 'Filter startsWith (nome+cargo)',  tag: 'useMemo',                component: Ex10 },
  { id: 11, label: 'Filter includes (nome+cargo)',    tag: 'useMemo',                component: Ex11 },
  { id: 12, label: 'IBGE: 2 Dropdowns',              tag: 'useEffect + useState',   component: Ex12 },
  { id: 13, label: 'IBGE: Lista Municípios',          tag: 'useEffect',              component: Ex13 },
  { id: 14, label: 'IBGE: Filter startsWith',        tag: 'useEffect + useMemo',    component: Ex14 },
  { id: 15, label: 'IBGE: Filter includes',          tag: 'useEffect + useMemo',    component: Ex15 },
  { id: 16, label: 'IBGE: Ranking de Nomes',         tag: 'useEffect',              component: Ex16 },
]

export default function App() {
  const [current, setCurrent] = useState(1)
  const ex = exercises.find(e => e.id === current)
  const Component = ex?.component

  return (
    <div className="app">
      <div className="nav">
        <h1>⚛️ React Hooks — Exercícios (1–16)</h1>
        <div className="tabs">
          {exercises.map(e => (
            <button
              key={e.id}
              className={`tab${current === e.id ? ' active' : ''}`}
              onClick={() => setCurrent(e.id)}
            >
              {e.id}
            </button>
          ))}
        </div>
      </div>

      <div className="main">
        <div className="ex-header">
          <h2>Exercício {current} — {ex?.label}</h2>
          <span className="hook-tag">{ex?.tag}</span>
        </div>
        {Component && <Component key={current} />}
      </div>
    </div>
  )
}
