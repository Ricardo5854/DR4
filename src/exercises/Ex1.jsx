import { useState } from 'react'

export default function Ex1() {
  const [user, setUser] = useState({ name: 'Alice', age: 25 })

  return (
    <div className="wrap">
      <div className="card">
        <div className="f1">
          <div style={{ fontWeight: 500 }}>{user.name}</div>
          <div className="muted">{user.age} anos</div>
        </div>
        <button className="btn-suc" onClick={() => setUser(u => ({ ...u, age: u.age + 1 }))}>
          + Idade
        </button>
        <button className="btn-dan" onClick={() => setUser(u => ({ ...u, age: u.age - 1 }))}>
          − Idade
        </button>
      </div>
    </div>
  )
}
