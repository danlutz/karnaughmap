import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { conjunctInputs } from '../../utils/cdnf'

const StyledFormula = styled.div`
  grid-column: ${({ column }) => column + 1};
  grid-row: ${({ row }) => row + 1};

  background-color: ${({ result }) => (result ? '#01FF70' : '#fff')};
  padding: 1rem;
  border: 1px solid #f1f1f1;
  position: relative;
  white-space: nowrap;

  .rowNumber {
    ${({ displayType }) =>
      displayType === 'rowNumber' &&
      'display: none;'} // Do not show hashed rowNumber twice
      position: absolute;
    top: 0;
    right: 0;
    font-size: 9px;
    padding: 0.25rem;
  }
`

const reduceToBinaryString = inputs =>
  inputs.reduce((binaryString, input) => `${binaryString}, ${input}`)

const getFormula = (inputs = [], displayType, rowNumber) => {
  switch (displayType) {
    case 'names':
      return conjunctInputs(inputs)
    case 'binary':
      return reduceToBinaryString(inputs)
    case 'rowNumber':
      return rowNumber
    default:
      return conjunctInputs(inputs)
  }
}

const KarnaughMapElement = ({
  booleanExpression,
  row,
  column,
  displayType
}) => {
  const { inputs, rowNumber, result } = booleanExpression
  const formula = getFormula(inputs, displayType, rowNumber)

  return (
    <StyledFormula
      result={result}
      row={row}
      column={column}
      displayType={displayType}
    >
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
  column: PropTypes.number.isRequired,
  displayType: PropTypes.string.isRequired
}

export default KarnaughMapElement
