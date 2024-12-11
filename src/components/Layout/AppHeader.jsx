import { Select, Space, Layout, Button} from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect,  useState } from 'react';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  display: 'flex',
  padding: '0.8rem 1.1rem',
  justifyContent: 'space-between',
  alineItems: 'center',
};


const handleChange = (value) => {
  console.log(`selected ${value}`);
}; 


export default function AppHeader() {
  const { crypto } = useCrypto();
 
  const [open, setOpen] = useState()
  useEffect(() => {
    const keypress = event => {
      if (event.key === '/')
        setOpen((prev) => !prev)
      
    }
    document.addEventListener('keypress', keypress)
      return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    console.log(value)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        open = {open}
        onClick= {() => setOpen((prev) => !prev)}
        className="dynamic-select"
        style={{
          width: "250px",
        }}
        placeholder="press / to open"
        options={crypto.map((coin) => ({
          label: coin.id,
          value: coin.name,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 25 }} src={option.data.icon} alt={option.data.label} />{" "}
            {option.data.value}
          </Space>
        )}
      />
      <Button type="primary">ADD COIN</Button>
    </Layout.Header>
  );
}
