// const StyledContainer = styled(Box)`
//   height: 100vh;

import { StyledContainer } from './styled'

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

function Loading() {
  return (
    <StyledContainer>
      <div>
        <div className="body">
          <span>
            <span />
            <span />
            <span />
            <span />
          </span>
          <div className="base" />
          <div className="face" />
        </div>
        <div className="longfazers">
          <span />
          <span />
          <span />
          <span />
        </div>
        <h1>Redirecting</h1>
      </div>
    </StyledContainer>
  )
}

export default Loading
