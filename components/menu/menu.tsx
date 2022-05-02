import React from 'react';
import Link from 'next/link'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Service } from '../../pages/index';
import CancelIcon from '@mui/icons-material/Cancel';
import ModeNight from '@mui/icons-material/ModeNight';
import Disruptions from '../disruptions/disruptions';

import { hasDisruption } from '../../lib/hasDisruption';
import { hasNightService } from '../../lib/hasNightService';
import { getDisruptions } from 'lib/getDisruptions';

interface ServiceMenuProps {
  services: Service[]
}


export default function ServiceMenu({ services }: ServiceMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [disruptions, setDisruptions] = React.useState<string[]>([]);
  const [serviceName, setServiceName] = React.useState<string>('');

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null); // close the menu
  };

  const handleItemClose = (service: Service) => {
    const disruptions = getDisruptions(service);
    setDisruptions(disruptions);
    setServiceName(service.name);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Services
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {services && services.map((service: Service) => (
          <MenuItem 
            key={service.id} 
            onClick={() => handleItemClose(service)}>
              {service.name} 
              {hasDisruption(service) && <CancelIcon sx={{ color: 'red' }} />}
              {hasNightService(service) && <ModeNight />} 
          </MenuItem>
          
        ))}
        <Link href="/cycle-hire" passHref>
          <MenuItem sx={{ backgroundColor: 'black', color: 'red', fontWeight: 'bold'}}>
            Cycle Hire
          </MenuItem>
        </Link>
      </Menu>
      {/* needs better naming */}
      {serviceName && <Disruptions disruptions={disruptions} serviceName={serviceName}/>} 
    </div>
  );
}