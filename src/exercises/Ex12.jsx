import { useState, useEffect } from 'react'
import { useEstados, useMunicipios } from '../hooks/useIBGE'

export default function Ex12() {
  const { estados, loading: loadingEstados } = useEstados()
  const [uf, setUf] = useState('')
  const [municipio, setMunicipio] = useState('')
  const { municipios, loading: loadingMun } = useMunicipios(uf)

  useEffect(() => setMunicipio(''), [uf])

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

        <div>
          <div className="label">Município</div>
          <select
            value={municipio}
            onChange={e => setMunicipio(e.target.value)}
            disabled={!uf || loadingMun}
            style={{ minWidth: 200 }}
          >
            <option value="">
              {loadingMun
                ? 'Carregando...'
                : !uf
                ? 'Selecione um estado primeiro'
                : 'Selecione um município'}
            </option>
            {municipios.map(m => (
              <option key={m.id} value={m.nome}>{m.nome}</option>
            ))}
          </select>
        </div>
      </div>

      {municipio && (
        <div className="selected-info">
          📍 <strong>{municipio}</strong> — {estados.find(s => s.sigla === uf)?.nome}
        </div>
      )}
    </div>
  )
}
