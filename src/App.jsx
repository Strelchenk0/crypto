
import { Layout} from 'antd';
import AppHeader from './components/Layout/AppHeader';
import AppSider from './components/Layout/AppSider';
import AppContent from './components/Layout/AppContent';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001259',
};

export default function App() {
  return ( 
  <Layout>
    <AppHeader/>
      <Layout>
       <AppSider/>
     <AppContent />
  </Layout>
</Layout>
  )
}
