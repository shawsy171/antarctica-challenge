import React, { useCallback, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createCycleHireFetch } from 'services/api/api';
import { debounce } from 'lodash';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';

const fetchCycleHire = createCycleHireFetch();

const CycleHire = () => {
  const [bikes, setBikes] = React.useState([]);
  const [inputSearchTerm, setInputSearchTerm] = React.useState('');

  const debouncedGetCycleHire = React.useRef(
    debounce(async (searchTerm, setInputSearchTerm) => {
      const bikesData = await fetchCycleHire(searchTerm);
      setBikes(() => bikesData)
      setInputSearchTerm(() => searchTerm);
    }, 500)
  ).current  

  const handleChange = async (searchTerm: string) => {
    
    
      debouncedGetCycleHire(searchTerm, setInputSearchTerm);
    
  }

  return (
    <div>
      <h1>cycle hire</h1>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            role="textbox"
            id="outlined-required"
            label="Cycle Hire"
            defaultValue=""
            onChange={(e) => { handleChange(e.target.value) }}
          />
        </div>
      </Box>
      {(bikes.length === 0 && inputSearchTerm !== '')&& <h1>No bike points found for {inputSearchTerm}</h1>}
      <List>
        {bikes.map((bike: any) => (
          <ListItem key={bike.id}>
            <ListItemText primary={`${bike.id} - ${bike.commonName} (${bike.lat}, ${bike.lon})`} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default CycleHire
