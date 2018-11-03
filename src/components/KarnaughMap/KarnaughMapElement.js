import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { conjunctInputs } from '../../utils/cdnf'

const StyledFormula = styled.div`
  grid-column: ${props => props.column + 1};
  grid-row: ${props => props.row + 1};

  background-color: ${props => (props.result ? '#01FF70' : '#fff')};
  padding: 1rem;
  border: 1px solid #f1f1f1;
  position: relative;
  white-space: nowrap;

  .rowNumber {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 9px;
    padding: 0.25rem;
  }
`

const KarnaughMapElement = ({ booleanExpression, row, column }) => {
  const { inputs, rowNumber, result } = booleanExpression
  const formula = conjunctInputs(inputs)

  return (
    <StyledFormula result={result} row={row} column={column}>
      {formula}
      <span className="rowNumber">#{rowNumber}</span>
    </StyledFormula>
  )
}

KarnaughMapElement.propTypes = {
  booleanExpression: PropTypes.shape({
    inputs: PropTypes.arrayOf(PropTypes.number),
    rowNumber: PropTypes.number,
    result: PropTypes.number
  }),
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired
}

export default KarnaughMapElement
