/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState } from "react";
import "./test.css"
//import Grap from "./line"
import { useSelector } from 'react-redux'
import { sessionSelector } from 'redux/reducer/sessionSlice'
import { StatusOverview } from './status-overview'
import { NetworkStatistic, ClientsConnected } from './network-statistic'
import { useTranslation } from "react-i18next";
import Calendar from './calendar';
import "../../../translations/i18n";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Typography,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

export const Dashboard = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={[24, 10]}>
        <Col md={8}>
          <Card>
            <StatusOverview></StatusOverview>
          </Card>
        </Col>

        <Col md={16}>
          <Card title={t("Calendar")} headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}} bodyStyle={{height: "398px"}}>
            <Calendar></Calendar>
          </Card>
        </Col>
      </Row>
      <br></br>
      <Row gutter={[24, 10]}>
        <Col span={24} md={12}>
          <Card title={t("wan_statistic")} headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}} >
            <NetworkStatistic name="wan"></NetworkStatistic>
          </Card>
        </Col>

        <Col md={12}>
          <Card title={t("lan_statistic")} headStyle={{background:"linear-gradient(113deg, rgba(32,162,145,1) 0%, rgba(18,207,141,1) 30%)",color: 'white'}}>
            <NetworkStatistic name="lan"></NetworkStatistic>
          </Card>
        </Col>       
      </Row>
    </>
  );
}
