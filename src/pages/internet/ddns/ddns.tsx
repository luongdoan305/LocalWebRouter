import AntdLayout from '../../../components/antd/layout'
import { DDNS } from '../../../components/antd/internet/ddns/ddns'
import { Card, Col } from 'antd'

const Page = () => {
  return (
      <Col span={23}>
        <Card title="DDNS" type="inner" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}}>
          <DDNS />
        </Card>
      </Col>
  )
}
export default Page
