import AntdLayout from 'components/antd/layout'
import { Button, Card, Col, Modal } from "antd"
import React from "react"
import { Dnsedit } from 'components/antd/service/dns/edit'
import { Dnstable } from 'components/antd/service/dns/table';
import "../../../translations/i18n";
import { useTranslation } from "react-i18next"

const Page = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = React.useState(true)
  setTimeout(() => {
    setLoading(false)
  }, 2000);
  return (
    <Card>
      <Card title={t("DNS Options")} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
        <Dnsedit />
      </Card>
      <Card loading={loading} title={t("DNS List")} type="inner" headStyle={{ background: "linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)", color: 'white' }}>
        <div style={{ overflowX: 'auto' }}>
          <Dnstable />
        </div>
      </Card>
    </Card>

  )
}

export default Page
