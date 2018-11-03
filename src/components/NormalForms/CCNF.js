import React from 'react'
import PropTypes from 'prop-types'
import { getCanocialConjuctiveNormalForm } from '../../utils/ccnf'

const CCNF = ({ falseExpressions = [] }) => {
  if (falseExpressions.length === 0) return null

  const ccnf = getCanocialConjuctiveNormalForm(falseExpressions, true)

  return (
    <div>
      <h2>Canonical Conjunctive Normal Form</h2>
      <p>{ccnf}</p>
    </div>
  )
}

CCNF.propTypes = {
  falseExpressions: PropTypes.arrayOf(
    PropTypes.shape({
      inputs: PropTypes.arrayOf(PropTypes.number),
      rowNumber: PropTypes.number,
      result: PropTypes.number
    })
  ).isRequired
}

export default CCNF
