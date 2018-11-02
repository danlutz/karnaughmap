import React from 'react'
import PropTypes from 'prop-types'

const getConjunctedFormulaString = inputs => {
  const formula = inputs.reduce((formula, input, currentIndex) => {
    if (currentIndex === 0) return `${input ? 'x' : '¬x'}${currentIndex}`

    // Invert all variables
    return `${formula} ∧ ${input ? 'x' : '¬x'}${currentIndex}`
  }, '')

  // Wrap formula
  return `(${formula})`
}

const disjunct = stringArray =>
  stringArray.reduce((formula, string) => formula + ` ∨ ${string}`)

const KDNF = ({ trueExpressions = [] }) => {
  if (trueExpressions.length === 0) return null

  const conjunctedFormulas = trueExpressions.map(inputs =>
    getConjunctedFormulaString(inputs)
  )

  const kdnf = disjunct(conjunctedFormulas)

  return (
    <div>
      <h2>KDNF</h2>
      <p>{kdnf}</p>
    </div>
  )
}

KDNF.propTypes = {
  trueExpressions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired
}

export default KDNF
