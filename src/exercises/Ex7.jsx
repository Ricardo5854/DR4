import { useState, useMemo } from 'react'

function calcFactorial(n) {
  if (n < 0 || n > 170) return null
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}

export default function Ex7() {
  const [input, setInput] = useState('')

  const result = useMemo(() => {
    const n = parseInt(input)
    return isNaN(n) ? null : calcFactorial(n)
  }, [input])

  const n = parseInt(input)

  return (
    <div className="wrap">
      <input
        type="number"
        min="0"
        max="170"
        style={{ maxWidth: 260 }}
        placeholder="Digite um número inteiro (0 – 170)"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <p className="info">useMemo — o fatorial só é recalculado quando o valor do input muda.</p>
      {input !== '' && !isNaN(n) && (
        <div className="result-box">
          {result !== null
            ? <><strong>{n}!</strong> = {result.toLocaleString('pt-BR')}</>
            : <span style={{ color: '#b32020' }}>Fora do intervalo (0 – 170)</span>}
        </div>
      )}
    </div>
  )
}
