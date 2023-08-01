import {
  TableOutlined,
  GlobalOutlined,
  PartitionOutlined,
  HomeOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  SecurityScanOutlined,
  WifiOutlined,
  SafetyOutlined,
  ShareAltOutlined,
  LogoutOutlined,
  SolutionOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { appStateSelector } from '../../redux/reducer/appStateSlice'

import type { MenuProps } from 'antd';

import { useTranslation } from "react-i18next";
import "../../translations/i18n";

type MenuItem = Required<MenuProps>['items'][number];

function GetItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {

  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const MainMenu = (props: any) => {
  const { t } = useTranslation();

  const items: MenuProps['items'] = [

    GetItem(t('dashboard'), '', <HomeOutlined />),

    GetItem(t('internet'), 'internet', <GlobalOutlined />, [
      GetItem(t('wan_settings'), 'internet/wan'),
      GetItem(t('ddns'), 'internet/ddns'),
      GetItem(t('openvpn'), 'internet/openvpn'),
      GetItem(t('routing'), 'internet/routing'),
      GetItem(t('BGP'), 'internet/bgp'),
      GetItem(t('OSPF'), 'internet/ospf'),
      GetItem(t('RIP'), 'internet/rip'),
      GetItem(t('ISIS'), 'internet/isis'),
      GetItem(t('BFD'), 'internet/bfd'),
      GetItem(t('PIM'), 'internet/pim'),
    ]),

    GetItem(t('local_network'), 'network', <PartitionOutlined />, [
      GetItem(t('lan_settings'), 'network/lan'),
      GetItem(t('mac_settings'), 'network/mac'),
      GetItem(t('vlan_settings'), 'network/vlan'),
      GetItem(t('igmp'), 'network/igmp'),
      GetItem(t('LLDP'), 'network/lldp'),
      GetItem(t('STP'), 'network/stp'),
      GetItem(t('Portmirroring'), 'network/portmirroring'),
      GetItem(t('LAG'), 'network/lag'),
      GetItem(t('bonding'), 'network/bonding'),
      // GetItem(t('basic_wireless'), 'network/basicwifi'),
      // GetItem(t('guest_wifi'), 'network/guest'),
    ]),

    GetItem(t('security'), 'security', <SafetyCertificateOutlined />, [
      GetItem(t('port_forward'), 'security/portforward'),
      GetItem(t('ip_filter'), 'security/ipfilter'),
      GetItem(t('url_filter'), 'security/urlfilter'),
      GetItem(t('Linksafe Policy'), 'security/linksafepolicy'),
      GetItem(t('Nat64'), 'security/nat64'),
    ]),

    GetItem(t('VPN'), 'VPN', <SecurityScanOutlined />, [
      GetItem(t('L2TP'), 'VPN/L2TP'),
      GetItem(t('VXLAN'), 'VPN/VXLAN'),
      GetItem(t('GRE'), 'VPN/GRE'),
      GetItem(t('PPTP'), 'VPN/PPTP'),
      GetItem(t('VTI'), 'VPN/VTI'),
      GetItem(t('6To4 Tunnel'), 'VPN/6to4'),
      GetItem(t('IPSEC'), 'VPN/IPSEC'),
    ]),

    GetItem(t('linksafe_service'), 'linksafe', <SolutionOutlined />, [
      GetItem(t('register'), 'linksafe/register'),
    ]),

    GetItem(t('service'), 'service', <ShareAltOutlined />, [
      GetItem(t('NTP'), 'service/NTP'),
      GetItem(t('Multi Media'), 'service/multimedia'),
      GetItem(t('DNS'), 'service/DNS'),
    ]),

    GetItem(t('system'), 'system', <SettingOutlined />, [
      GetItem(t('ARP Table'), 'system/arp'),
      GetItem(t('basic_settings'), 'system/system'),
      GetItem(t('Ping'), 'system/ping'),
      GetItem(t('Traceroute'), 'system/traceroute'),
      GetItem(t('update_firmware'), 'system/update'),
      GetItem(t('factory_reset'), 'system/rsfactory'),
      GetItem(t('reboot'), 'system/reboot'),
      GetItem(t('shutdown'), 'system/shutdown'),
    ]),

    GetItem(t('logout'), 'logout', <LogoutOutlined />),

  ];

  const { setmenu, selected } = props
  const [selectedKey, setSelectedKey] = React.useState(setmenu)
  const [openKeys, setOpenKeys] = React.useState(['']);
  const navigate = useNavigate()


  const refreshData = async () => {
    if (setmenu === null || setmenu === "") {
      setOpenKeys(['dashboard'])
      setSelectedKey("")
    } else {
      setOpenKeys([setmenu.split('/')[0]])
      setSelectedKey(setmenu)
    }
  }
  // setTimeout(() => {
  //   refreshData()
  // }, 1000);
  // console.log('xinchao: ', setmenu)

  const onMenuItemClicked = ({ item, key, keyPath, domEvent }: any) => {
    setSelectedKey(key)
    sessionStorage.setItem("menu", key)
    navigate('/' + key)
  }

  const rootSubmenuKeys = ['', 'internet', 'network', 'security', 'linksafe', 'system'];

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }

  return (
    <Menu
      onClick={onMenuItemClicked}
      openKeys={openKeys}
      mode="inline"
      onOpenChange={onOpenChange}
      items={items}
      theme="light"
      triggerSubMenuAction="click"
      selectedKeys={[selectedKey]}
      style={{ fontWeight: "bold" }}
    />
  );

};
