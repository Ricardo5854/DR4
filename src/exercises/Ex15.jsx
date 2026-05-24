import { useState, useMemo, useEffect } from 'react'
import { useEstados, useMunicipios } from '../hooks/useIBGE'

export default function Ex15() {
  const { estados, loading: loadingEstados } = useEstados()
  const [uf, setUf] = useState('')
  const [query, setQuery] = useState('')
  const { municipios, loading } = useMunicipios(uf)

  useEffect(() => setQuery(''), [uf])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? municipios.filter(m => m.nome.toLowerCase().includes(q)) : municipios
  }, [municipios, query])

  return (
    <div className="wrap">
      <div className="row">
        <div>
          <div className="label">Estado (UF)</div>
          <select
            value={uf}
            onChange={e => setUf(e.target.value)}
            disabled={loadingEstados}
            style={{ minWidth: 200 }}
          >
            <option value="">
              {loadingEstados ? 'Carregando...' : 'Selecione um estado'}
            </option>
            {estados.map(s => (
              <option key={s.id} value={s.sigla}>
                {s.nome} ({s.sigla})
              </option>
            ))}
          </select>
        </div>

        {uf && !loading && (
          <div>
            <div className="label">Filtrar (contém)</div>
            <input
              placeholder="Digite..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {loading && <p className="info">Carregando municípios...</p>}

      {!loading && municipios.length > 0 && (
        <>
          <p className="info">{filtered.length}/{municipios.length} município(s)</p>
          <div className="list-box">
            {filtered.map(m => (
              <div key={m.id} className="list-item">{m.nome}</div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
