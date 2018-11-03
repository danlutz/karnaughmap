import isOdd from './isOdd'

// Calculates how many elements got added with fold n
const calcElementsAddedOnFold = foldNumber =>
  Math.ceil(2 ** (foldNumber - 1) / 2)

// Maps values of old matrix to new values
const calcNewPositionValuesMap = numberOfElements => {
  const newPositionsMap = new Map()

  for (let i = 0; i < numberOfElements; i++) {
    newPositionsMap.set(i, i + numberOfElements) // Maps 0 to 0 + n, etc.
  }

  return newPositionsMap
}

/* Vertical fold
1. Copy old matrix
2. Replace values with values from map
3. Reverse all rows in new matrix
4. Combine all old and new rows
*/

const foldVertical = (positionMatrix, elementsAddedOnFold) => {
  const newPositionsMap = calcNewPositionValuesMap(elementsAddedOnFold)
  const newPositionMatrix = []
  const reversedNewPositionMatrix = []

  // Copy all rows and replace their values with mapped value
  for (const row of positionMatrix) {
    const newRow = []
    for (const value of row) {
      newRow.push(newPositionsMap.get(value))
    }
    newPositionMatrix.push(newRow)
  }

  // Reverse all rows of new matrix
  for (const row of newPositionMatrix) {
    reversedNewPositionMatrix.push(row.reverse())
  }

  // Combine old and new rows
  const foldedMatrix = []
  for (let i = 0; i < positionMatrix.length; i++) {
    foldedMatrix.push([...positionMatrix[i], ...reversedNewPositionMatrix[i]]) // Combine old and new rows
  }

  return foldedMatrix
}

/* Horizontal fold
1. Copy all rows of old matrix
2. Replace values with values from map
3. Reverse order of new rows
4. Append new rows to old matrix
*/

const foldHorizontal = (positionMatrix, elementsAddedOnFold) => {
  const newPositionsMap = calcNewPositionValuesMap(elementsAddedOnFold)
  const newRows = []

  // Copy all rows and replace their values with mapped value
  for (const row of positionMatrix) {
    const newRow = []
    for (const value of row) {
      newRow.push(newPositionsMap.get(value))
    }
    newRows.push(newRow)
  }

  // Append reversed new rows to old matrix
  return [...positionMatrix, ...newRows.reverse()]
}

export const calcPositionMatrix = (
  targetFoldNumber,
  currentFoldNumber = 0,
  positionMatrix = [[0]] // Starting matrix for fold 0 and 1
) => {
  if (currentFoldNumber === targetFoldNumber) return positionMatrix
  else {
    currentFoldNumber++

    // Handle edge case
    if (currentFoldNumber === 1) {
      return calcPositionMatrix(targetFoldNumber, currentFoldNumber, [[0]])
    }

    // Check if horizontal fold
    const isHorizontalFold = isOdd(currentFoldNumber)

    // Get number of groups added with fold
    const elementsAddedOnFold = calcElementsAddedOnFold(currentFoldNumber)

    if (isHorizontalFold) {
      // Horizontal fold
      return calcPositionMatrix(
        targetFoldNumber,
        currentFoldNumber,
        foldHorizontal(positionMatrix, elementsAddedOnFold)
      )
    } else {
      // Vertical fold
      return calcPositionMatrix(
        targetFoldNumber,
        currentFoldNumber,
        foldVertical(positionMatrix, elementsAddedOnFold)
      )
    }
  }
}

export const calcPosition = (elementNumber, positionMatrix = []) => {
  // Find coordinates in positionMatrix
  for (let row = 0; row < positionMatrix.length; row++) {
    for (let col = 0; col < positionMatrix[row].length; col++) {
      if (positionMatrix[row][col] === elementNumber) {
        return [row, col]
      }
    }
  }

  // Position not found
  return [null, null]
}
