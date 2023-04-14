import { Button, ButtonProps } from '@mui/material'
import { ReactNode, memo, useMemo } from 'react'
import { StyledButtons, StyledChildren, StyledContainer } from './styled'

interface Props {
  children: ReactNode
  onCancel: () => void
  onSearch: () => void
}

interface ButtonAction extends ButtonProps {
  text: string
}

function SearchBox(props: Props) {
  // Props
  const { children, onCancel, onSearch } = props
  // End props

  const renderActions = useMemo(() => {
    const buttons: ButtonAction[] = [
      { text: 'Reset', color: 'error', onClick: onCancel },
      { text: 'Search', color: 'primary', onClick: onSearch }
    ]
    return (
      <StyledButtons>
        {buttons.map((button) => (
          <Button
            key={button.text}
            color={button.color}
            onClick={button.onClick}
            variant="contained"
          >
            {button.text}
          </Button>
        ))}
      </StyledButtons>
    )
  }, [onCancel, onSearch])

  return (
    <StyledContainer>
      <StyledChildren>
        {children}
      </StyledChildren>
      {renderActions}
    </StyledContainer>
  )
}

export default memo(SearchBox)
