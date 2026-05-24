import { useState, useEffect } from 'react'

export function useEstados() {
  const [estados, setEstados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(r => r.json())
      .then(data => {
        setEstados(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { estados, loading }
}

export function useMunicipios(sigla) {
  const [municipios, setMunicipios] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!sigla) {
      setMunicipios([])
      return
    }
    setLoading(true)
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`)
      .then(r => r.json())
      .then(data => {
        setMunicipios(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [sigla])

  return { municipios, loading }
}
