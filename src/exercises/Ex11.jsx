import { useState, useMemo } from 'react'
import { users } from '../data/users'

export default function Ex11() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? users.filter(u =>
          u.name.toLowerCase().includes(q) ||
          u.job.toLowerCase().includes(q)
        )
      : users
  }, [query])

  return (
    <div className="wrap">
      <input
        placeholder="Nome ou cargo contém..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <p className="info">{filtered.length} resultado(s)</p>
      <div className="list-box">
        {filtered.map(u => (
          <div key={u.id} className="list-item">
            <span>{u.name}</span>
            <span className="muted" style={{ fontSize: 11 }}>{u.job}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
