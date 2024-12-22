import { Select, Space, Typography, Divider, Result, Button } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useState } from 'react';
import DrawerForm from './DrawerForm';

export default function DrawerElement({ onClose }) {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [result, setResult] = useState(false);

  // Функція для скидання стану
  const resetState = () => {
    setCoin(null);
    setResult(false);
  };

  if (result) {
    return (
      <Result
        status="success"
        title="Asset Added Successfully!"
        subTitle={`Added ${12} of ${coin.name} by price ${24}`}
        extra={[
          <Button onClick={onClose}  key="back">
            Close
          </Button>,
          <Button type="primary" onClick={resetState} key="buy">
            Add again
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        className="dynamic-select"
        style={{ width: '500px' }}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: (
            <Space>
              <img style={{ width: 25 }} src={coin.icon} alt={coin.name} /> {coin.name}
            </Space>
          ),
          value: coin.id,
        }))}
      />
    );
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src={coin.icon} alt={coin.name} style={{ width: 35 }} />
        <Typography.Title level={3} style={{ marginBottom: 3, lineHeight: '35px' }}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </div>
      <Divider style={{ borderColor: '#8eb5f5', borderWidth: '1px', }} />
      <DrawerForm setResult={setResult} coin={coin} />
    </>
  );
}
