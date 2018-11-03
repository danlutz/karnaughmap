import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import HorizontalScrollWrapper from '../Misc/HorizontalScrollWrapper'
import KarnaughMapElement from './KarnaughMapElement'
import { calcPositionMatrix, calcPosition } from '../../utils/recursiveFolding'
import { supportsCSSGrid } from '../../utils/checkBrowserSupport'

const StyledKarnaughMap = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
`

const KarnaughMap = ({ booleanExpressions = [], numberOfInputs }) => {
  const positionMatrix = calcPositionMatrix(numberOfInputs + 1)

  return (
    <>
      <h2>Karnaugh Map</h2>
      {!supportsCSSGrid() && (
        <p>
          You need to use a{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Browser_compatibility"
            target="_blank"
            rel="noopener noreferrer"
          >
            browser that supports CSS Grid
          </a>{' '}
          <span role="img" aria-label="warning emoji">
            ⚠️
          </span>
        </p>
      )}
      <HorizontalScrollWrapper>
        <StyledKarnaughMap>
          {booleanExpressions.map(booleanExpression => {
            const { rowNumber } = booleanExpression
            const [row, column] = calcPosition(rowNumber, positionMatrix)

            return (
              <KarnaughMapElement
                booleanExpression={booleanExpression}
                column={column}
                row={row}
                key={rowNumber}
              />
            )
          })}
        </StyledKarnaughMap>
      </HorizontalScrollWrapper>
    </>
  )
}

KarnaughMap.propTypes = {
  booleanExpressions: PropTypes.arrayOf(
    PropTypes.shape({
      inputs: PropTypes.arrayOf(PropTypes.number),
      rowNumber: PropTypes.number,
      result: PropTypes.number
    })
  ).isRequired,
  numberOfInputs: PropTypes.number.isRequired
}

export default KarnaughMap
