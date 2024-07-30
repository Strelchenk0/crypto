import { Layout, Card, List, Typography } from 'antd';
import { Statistic, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../../api';
import { persentDefference } from '../../utils';


const siderStyle = {
  padding: '1rem',
};

export default function AppSider() { 

const [loading, setLoading] = useState(false);
const [crypto, setCrypto] = useState([]);
const [assets, setAssets] = useState([]);


 useEffect(() => {
  async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();  
      const assets = await fetchAssets();

      setAssets(assets.map((asset) => {
        const coin = result.find((c) => c.id === asset.id)
        return {
          grow: asset.price < coin.price,
          growPercent: persentDefference(asset.price, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,

          ...asset,
        }
      })
    );

      setCrypto(result);
      setLoading(false);
  }
  preload()
 }, [])

 if (loading) {
  return <Spin fullscreen />
 }

  return (  
    <Layout.Sider width="25%" style={siderStyle}>
   {assets.map(asset => (
    <Card key={asset.id} style={{ marginBottom: '1rem' }}>
    <Statistic
      
      title={asset.id}
      value={asset.totalAmount}
      precision={2}
      valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
      prefix={ asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined /> }
      suffix="$"
    /> 

    <List
      size='small'
      bordered
      dataSource={[
        {title: 'Tottal profit', value: asset.totalProfit},
        {title: 'Asset amount', value: asset.amount},
        {title: 'Difference', value: asset.growPercent},
      ]}
      renderItem={(item) => (
        <List.Item>
         <span>{item.title}</span>
         <span>{item.value}</span>
        </List.Item>
      )}
    />    
  </Card>
   ) )}


      {/* <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />

        <List
          size='small'
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />   
      </Card> */}
    </Layout.Sider>
  );
}
