import { WanSettings2 } from 'components/antd/internet/wan/wan2'
import AntdLayout from 'components/antd/layout'
import React from 'react'
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { Card } from "antd"

export const Wan2 = () => {
  const { t } = useTranslation()
  return (
      <WanSettings2 />
  )
}