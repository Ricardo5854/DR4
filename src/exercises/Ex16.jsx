import { useState } from 'react'

export default function Ex16() {
  const [decade, setDecade] = useState('')
  const [ranking, setRanking] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = () => {
    const d = parseInt(decade)
    if (isNaN(d) || d % 10 !== 0 || d < 1930 || d > 2010) {
      setError('Digite uma década válida terminada em 0 (1930–2010)')
      return
    }
    setError('')
    setLoading(true)
    setRanking([])
    fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/?decada=${d}`)
      .then(r => r.json())
      .then(data => {
        setRanking(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Erro ao carregar os dados.')
        setLoading(false)
      })
  }

  return (
    <div className="wrap">
      <div className="row">
        <input
          type="number"
          style={{ maxWidth: 160 }}
          placeholder="Ex: 1950"
          value={decade}
          onChange={e => setDecade(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-primary" onClick={handleSearch}>Buscar</button>
      </div>
      <p className="info">Décadas disponíveis: 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010</p>

      {error && <p className="err">{error}</p>}
      {loading && <p className="info">Carregando...</p>}

      {ranking.length > 0 && (
        <div className="rank-box">
          <div className="rank-header">Ranking — Década de {decade}</div>
          {ranking.map((item, i) => (
            <div key={i} className="rank-item">
              <div className="rank-num">{item.ranking}</div>
              <span style={{ flex: 1, fontWeight: 500 }}>{item.nome}</span>
              <span className={`badge ${item.sexo === 'M' ? 'badge-m' : 'badge-f'}`}>
                {item.sexo === 'M' ? '♂ Masc' : '♀ Fem'}
              </span>
              <span className="muted" style={{ minWidth: 80, textAlign: 'right' }}>
                {(item.res?.[0]?.frequencia ?? 0).toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
