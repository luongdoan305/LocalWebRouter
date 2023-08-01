import { WanSettings1 } from 'components/antd/internet/wan/wan1'
import AntdLayout from 'components/antd/layout'
import React from 'react'
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { Card } from "antd"

export const Wan1 = () => {
  const { t } = useTranslation()
  return (
      <WanSettings1 />
  )
}