import { useState } from 'react'

const getResultCol = numberOfInputs => {
  const y = {}
  for (let i = 0; i < 2 ** numberOfInputs; i++) {
    y[i] = 0
  }
  return y
}

const getHeaders = numberOfInputs => {
  const headers = []

  // Fill headers array with increasing numbers starting from 0
  for (let i = 0; i < numberOfInputs; i++) {
    headers.push(i)
  }

  return headers
}

const getRows = numberOfInputs => {
  const rows = []

  // Create 2^n rows
  for (let rowNumber = 0; rowNumber < 2 ** numberOfInputs; rowNumber++) {
    rows.push(getRow(rowNumber, numberOfInputs))
  }

  return rows
}

const getRow = (rowNumber, numberOfInputs) => {
  const row = []

  // Fill all rows with an increasing binary number whose digits are split over row cells
  for (let cellNumber = 0; cellNumber < numberOfInputs; cellNumber++) {
    row.push(getCellValue(rowNumber, cellNumber))
  }

  // Reverse the array to get higher bits at the front
  return row.reverse()
}

const getCellValue = (rowNumber, cellNumber) => {
  // Right shift the binary value of the rowNumber by n bits
  // Binary AND comparison results in 1 or 0 values
  return (rowNumber >> cellNumber) & 1
}

// Maps input rows and their corresponding result to an expression object
const getBooleanExpressions = (rows, results) =>
  rows.map((inputs, rowNumber) => ({
    inputs,
    rowNumber,
    result: results[rowNumber]
  }))

export default n => {
  const [numberOfInputs, setNumbersOfInputs] = useState(n)
  const [results, setResults] = useState(getResultCol(numberOfInputs))
  const [headers, setHeaders] = useState(getHeaders(numberOfInputs))
  const [rows, setRows] = useState(getRows(numberOfInputs))
  const expressions = getBooleanExpressions(rows, results)

  const updateState = newNumberOfInputs => {
    setNumbersOfInputs(newNumberOfInputs)
    setHeaders(getHeaders(newNumberOfInputs))
    setRows(getRows(newNumberOfInputs))
  }

  // Updates rows and headers
  const handleInputsChange = event => {
    const value = Number(event.target.value)
    updateState(value)
  }

  const increaseInputs = () => {
    if (numberOfInputs < 32) {
      updateState(numberOfInputs + 1)
    }
  }

  const decreaseInputs = () => {
    if (numberOfInputs > 1) {
      updateState(numberOfInputs - 1)
    }
  }

  // Updates y col
  const toggleResult = rowNumber => {
    setResults({
      ...results,
      [rowNumber]: results[rowNumber] === 1 ? 0 : 1
    })
  }

  return {
    numberOfInputs,
    handleInputsChange,
    increaseInputs,
    decreaseInputs,
    headers,
    rows,
    results,
    toggleResult,
    expressions
  }
}
