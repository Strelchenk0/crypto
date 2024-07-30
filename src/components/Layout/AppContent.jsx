import { Layout} from 'antd';



const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: 'rgb(0, 21, 41)',
};

export default function AppContent() {
  return ( <Layout.Content style={contentStyle}></Layout.Content>)
}