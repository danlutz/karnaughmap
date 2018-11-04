import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CCNF from './CCNF'
import CDNF from './CDNF'
import { Collapse, Button } from 'reactstrap'

const NormalForms = ({ falseExpressions = [], trueExpressions = [] }) => {
  const [showNormalForms, setShowNormalForms] = useState(true)

  return (
    <>
      <Button onClick={() => setShowNormalForms(!showNormalForms)}>
        {showNormalForms ? 'Hide' : 'Show'} normal forms
      </Button>
      <Collapse isOpen={showNormalForms}>
        <h2>Normal Forms</h2>
        <CCNF falseExpressions={falseExpressions} />
        <CDNF trueExpressions={trueExpressions} />
      </Collapse>
    </>
  )
}

NormalForms.propTypes = {
  trueExpressions: PropTypes.arrayOf(
    PropTypes.shape({
      inputs: PropTypes.arrayOf(PropTypes.number),
      rowNumber: PropTypes.number,
      result: PropTypes.number
    })
  ).isRequired,
  falseExpressions: PropTypes.arrayOf(
    PropTypes.shape({
      inputs: PropTypes.arrayOf(PropTypes.number),
      rowNumber: PropTypes.number,
      result: PropTypes.number
    })
  ).isRequired
}

export default NormalForms
