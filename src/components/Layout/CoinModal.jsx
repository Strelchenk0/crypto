import { Divider, Flex, Typography, Tag, Button } from "antd";
import {formatNumber} from '../../utils'

export default function CoinModal({ coin, onOk, handleCancel }) {
  return (
   <>
    <Flex align="center" style={{ gap: "8px" }}> 
      <img src={coin.icon} alt={coin.name} style={{ width: 35 }} />
      <Typography.Title level={3} style={{ marginBottom: 3, lineHeight: "35px" }}>
        ({coin.symbol}) {coin.name}
      </Typography.Title>
    </Flex>

    <Divider style={{ borderColor: '#8eb5f5', borderWidth: '1px', }} />
    
    <Typography.Paragraph>
        <Typography.Text strong>
            1 hour:  <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h > 0 ? '+' : ''}{coin.priceChange1h}%</Tag>
        </Typography.Text>

        <Typography.Text strong>
            1 day:  <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d > 0 ? '+' : ''}{coin.priceChange1d}%</Tag>
        </Typography.Text>

        <Typography.Text strong>
            1 week:  <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w > 0 ? '+' : ''}{coin.priceChange1w}%</Tag>
        </Typography.Text>
    </Typography.Paragraph>

    <Typography.Paragraph>
        <Typography.Text strong style={{paddingRight: 5}}>
          Price:
        </Typography.Text> 
        <Typography.Text>
          {coin.price.toFixed(2)}$
        </Typography.Text> 
    </Typography.Paragraph>

    <Typography.Paragraph>
        <Typography.Text strong style={{paddingRight: 5}}>
          Market Cap:
        </Typography.Text> 
        <Typography.Text>
          {formatNumber(coin.marketCap)}$
        </Typography.Text> 

    </Typography.Paragraph>

    <Typography.Paragraph style={{display:'flex', justifyContent: 'flex-end', }}>
    <Button onClick={handleCancel} type="default">
      Close
      </Button>
      <Button onClick={onOk} style={{ marginLeft:'8px'}} type="primary">
      Select again
      </Button>


    </Typography.Paragraph>
   </> 
  );   
}
