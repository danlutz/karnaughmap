import React from 'react'
import PropTypes from 'prop-types'

const getDisjunctedFormulaString = inputs => {
  const formula = inputs.reduce((formula, input, currentIndex) => {
    if (currentIndex === 0) return `${input ? '¬x' : 'x'}${currentIndex}`

    // Invert all variables
    return `${formula} ∨ ${input ? '¬x' : 'x'}${currentIndex}`
  }, '')

  // Wrap formula
  return `(${formula})`
}

const conjuct = stringArray =>
  stringArray.reduce((formula, string) => formula + ` ∧ ${string}`)

const KKNF = ({ falseExpressions = [] }) => {
  if (falseExpressions.length === 0) return null

  const disjunctedFormulas = falseExpressions.map(inputs =>
    getDisjunctedFormulaString(inputs)
  )

  const kknf = conjuct(disjunctedFormulas)

  return (
    <div>
      <h2>KKNF</h2>
      <p>{kknf}</p>
    </div>
  )
}

KKNF.propTypes = {
  falseExpressions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired
}

export default KKNF
