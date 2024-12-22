import { Select, Space, Layout, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinModal from './CoinModal'
import DrawerElement from '../../components/Layout/Drawer';


const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  display: 'flex',
  padding: '0.8rem 1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
};


  const dropdownStyle ={
  height: '260px',
  scrollBehavior: 'smooth',
  }

export default function AppHeader() {
  const { crypto } = useCrypto();
  const [openSelect, setOpenSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  function handleCancel () {
    setIsModalOpen(false);
    setCoin(null); // Скидаємо вибраний елемент
  };

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') setOpenSelect((prev) => !prev);
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  const OnOk = () => {
      setOpenSelect(true)
      setIsModalOpen(false);
    }

  function handleSelect(value) {
    setIsModalOpen(true);

    setCoin(crypto.find((c) => c.id === value));
  }

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        value={coin?.id || null} 
        onSelect={handleSelect}
        open={openSelect}
        onClick={() => setOpenSelect((prev) => !prev)}
        className="dynamic-select"
        style={{
          width: '250px',
        }}
        placeholder="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} /> {option.data.label}
          </Space>
        )}
      />
      <Button onClick={showDrawer} type="primary">
        ADD COIN
      </Button>

      <Modal
        okType="primary"
        footer={false}
        open={isModalOpen}
        // onOk={OnOk} 
        // onCancel={handleCancel}
      >
       <CoinModal coin={coin} onOk={OnOk} handleCancel={handleCancel} />
      </Modal>

      <Drawer destroyOnClose width="600px" title="Add Asset" onClose={onClose} open={isDrawerOpen}>
        <DrawerElement onClose={() => setIsDrawerOpen(false)} />
      </Drawer>
    </Layout.Header>
  );
}
