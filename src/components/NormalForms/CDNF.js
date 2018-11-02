import React from 'react'
import PropTypes from 'prop-types'
import { getCanocialDisjunctiveNormalForm } from '../../utils/cdnf'

const CDNF = ({ trueExpressions = [] }) => {
  if (trueExpressions.length === 0) return null

  const cdnf = getCanocialDisjunctiveNormalForm(trueExpressions, true)

  return (
    <div>
      <h2>Canonical Disjunctive Normal Form</h2>
      <p>{cdnf}</p>
    </div>
  )
}

CDNF.propTypes = {
  trueExpressions: PropTypes.arrayOf(
    PropTypes.shape({
      inputs: PropTypes.arrayOf(PropTypes.number),
      rowNumber: PropTypes.number,
      result: PropTypes.number
    })
  ).isRequired
}

export default CDNF
