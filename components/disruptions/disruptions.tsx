import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
interface DisruptionsProps {
  disruptions: string[]
  serviceName: string
}

const Disruptions = ({disruptions, serviceName}: DisruptionsProps) => {
  return (
    <div>
      <h1>{serviceName} - {disruptions.length > 0 ? 'Service currently suffering disruptions' : 'No Service Disruptions'}</h1>
      <List>
      {disruptions.map((disruption: string, index: number) => (
        <ListItem key={index}>{disruption}</ListItem>
      ))}
      </List>
    </div>
  )
}

export default Disruptions
