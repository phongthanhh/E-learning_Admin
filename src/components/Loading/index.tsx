import { Box, CircularProgress } from '@mui/material'
import styled from 'styled-components'

const StyledContainer = styled(Box)`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`

function Loading() {
  return (
    <StyledContainer>
      <CircularProgress />
    </StyledContainer>
  )
}

export default Loading
