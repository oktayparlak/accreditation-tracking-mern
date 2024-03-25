import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import apiClient from '../services/api-client';
import { DataSource } from '../pages/Users';

interface FeaturesMenuProps {
  dataId: string;
  dataUrl: string;
  setReset: React.Dispatch<React.SetStateAction<any>>;
}

const FeaturesMenu = ({ dataId, dataUrl, setReset }: FeaturesMenuProps) => {
  const toast = useToast();

  const deleteData = () => {
    apiClient
      .delete(`${dataUrl}/${dataId}`)
      .then((response) => {
        toast({
          position: 'top-right',
          status: 'success',
          title: `Silme İşlemi Başarılı`,
          duration: 1000,
        });
        setReset({});
      })
      .catch((error) => {
        toast({
          position: 'top-right',
          status: 'error',
          title: `${
            error.response ? error.response.data.error.message : 'Sunucu Hatası'
          }`,
          duration: 1500,
        });
      });
  };

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
        <MenuItem onClick={deleteData}>Sil</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FeaturesMenu;
