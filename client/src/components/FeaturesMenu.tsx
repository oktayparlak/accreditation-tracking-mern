import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';

const FeaturesMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        borderRadius={'full'}
        color={'white'}
        bg={'blue.500'}
        colorScheme="blue"
      >
        İncele
      </MenuButton>
      <MenuList>
        <MenuItem>Düzenle</MenuItem>
        <MenuItem>Sil</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FeaturesMenu;
