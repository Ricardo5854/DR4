import { useState } from 'react'
import { useEstados, useMunicipios } from '../hooks/useIBGE'

export default function Ex13() {
  const { estados, loading: loadingEstados } = useEstados()
  const [uf, setUf] = useState('')
  const { municipios, loading } = useMunicipios(uf)

  return (
    <div className="wrap">
      <div>
        <div className="label">Estado (UF)</div>
        <select
          value={uf}
          onChange={e => setUf(e.target.value)}
          disabled={loadingEstados}
          style={{ minWidth: 220 }}
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

      {loading && <p className="info">Carregando municípios...</p>}

      {!loading && municipios.length > 0 && (
        <>
          <p className="info">{municipios.length} município(s)</p>
          <div className="list-box">
            {municipios.map(m => (
              <div key={m.id} className="list-item">{m.nome}</div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
