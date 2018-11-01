export const getHeaders = numberOfInputs => {
  const headers = []

  // Fill headers array with increasing numbers starting from 0
  for (let i = 0; i < numberOfInputs; i++) {
    headers.push(i)
  }

  return headers
}

export const getRows = numberOfInputs => {
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

const getCellValue = (rowNumber, n) => {
  // Right shift the binary value of the rowNumber by n bits
  // Binary AND comparison results in 1 or 0 values
  return (rowNumber >> n) & 1
}
