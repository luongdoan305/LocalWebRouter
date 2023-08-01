import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal } from "antd"
import React from "react"
import { MeshTable } from 'components/antd/network/mesh/mesh'
import { MeshTopo } from 'components/antd/network/mesh/mesh_topo';
import "../../../translations/i18n";
import { useTranslation } from "react-i18next"

const Page = () => {
  const {t} = useTranslation()
  const [loading, setLoading] = React.useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 2000);
  return (
    <Card>
      <Card title={t("Global_Configuration")} type="inner" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}}>
          <MeshTable />
      </Card>
      <Card  loading={loading} title={t("Mesh_Topo_Information")} type="inner" headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}}>
        <MeshTopo />
      </Card>
    </Card>
    
  )
}

export default Page
