import { useState } from 'react'

const getInitialValues = numberOfInputs => {
  const y = {}
  for (let i = 0; i < 2 ** numberOfInputs; i++) {
    y[i] = 0
  }
  return y
}

export default numberOfInputs => {
  const [results, setResults] = useState(getInitialValues(numberOfInputs))

  const handleChange = event => {
    const {
      target: { name, value }
    } = event

    setResults({
      ...results,
      [name]: Number(value)
    })
  }

  return {
    results,
    handleChange
  }
}
