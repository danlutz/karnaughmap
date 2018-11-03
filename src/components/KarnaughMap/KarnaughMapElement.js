import React from 'react'
import PropTypes from 'prop-types'
import { conjunctInputs } from '../../utils/cdnf'
import styled from 'styled-components'

const StyledFormula = styled.div`
  grid-column: ${props => (props.left ? 'left' : 'right')};
  grid-row: ${props => (props.top ? 'top' : 'bottom')};

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

const KarnaughMapElement = ({ booleanExpression, top, left }) => {
  const { inputs, rowNumber, result } = booleanExpression
  const formula = conjunctInputs(inputs)

  return (
    <StyledFormula result={result} top={top} left={left}>
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
  top: PropTypes.bool.isRequired,
  left: PropTypes.bool.isRequired
}

export default KarnaughMapElement
