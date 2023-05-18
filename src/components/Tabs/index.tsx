import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { TabsListProps } from 'models'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default function BasicTabs({ tabs }: TabsListProps) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map(({ label, id }) => (
            <Tab label={label} key={id} />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ Component, id }) => (
        <TabPanel value={value} index={id} key={id}>
          {Component}
        </TabPanel>
      ))}
    </Box>
  )
}
