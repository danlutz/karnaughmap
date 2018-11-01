import React from 'react'
import styled from 'styled-components'

const StyledTableWrapper = styled.div`
  // Make tables horizontally scrollable
  overflow: auto;
  display: inline-block;
  width: 100%;
`

const TableWrapper = ({ children }) => (
  <StyledTableWrapper>{children}</StyledTableWrapper>
)

export default TableWrapper
