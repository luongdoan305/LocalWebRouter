import { createBrowserRouter, Router } from 'react-router-dom'
import PageLogin from 'pages/login'
import StatusOverviewPage from 'pages/status/overview'
import NetworkInterfacesPage from 'pages/network/multicast'
import NetworkVlan from 'pages/network/vlan'
import NetworkLldp from 'pages/network/lldp'
import NetworkStp from 'pages/network/stp'
import NetworkLag from 'pages/network/lag'
import NetworkPortmirror from 'pages/network/portmirroring'
import NetworkLan from 'pages/network/lan'
import NetworkMac from 'pages/network/mac'
import NetworkBonding from 'pages/network/bonding'
import PortForward from 'pages/security/port-forward'
import Ipfilter from 'pages/security/ipfilter'
import URLfilter from 'pages/security/URLfilter/URLfilterindex'
import Linksafepolicy from 'pages/security/linksafepolicy'
import Nat64 from 'pages/security/nat64'
import L2TP from 'pages/vpn/l2tp'
import VXLAN from 'pages/vpn/vxlan'
import GRE from 'pages/vpn/gre'
import PPTP from 'pages/vpn/pptp'
import VTI from 'pages/vpn/vti'
import T04 from 'pages/vpn/6to4'
import ResgisLinksafe from 'pages/linksafe/resgistration'
import NptService from 'pages/service/ntp'
import DnsService from 'pages/service/dns'
import MultiService from 'pages/service/multimedia'
import ArpSystem from 'pages/system/arp'
import UlSystem from 'pages/system/ulfirmware'
import FactorySystem from 'pages/system/rsfactory'
import PingSystem from 'pages/system/ping'
import PacketSystem from 'pages/system/packet'
import SettingsSystem from 'pages/system/settings'
import RebootSystem from 'pages/system/reboot'
import ShutdownSystem from 'pages/system/shutdown'
import WirelessInterfacesPage from 'pages/network/wireless/basicwifi'
import WanSettingPage from 'pages/internet/wan/index'
import DdnsSettingPage from 'pages/internet/ddns/ddns'
import OpenVpnInternet from 'pages/internet/openvpn'
import Bfd from 'pages/internet/bfd'
import Bgp from 'pages/internet/bgp'
import  Isis from 'pages/internet/isis'
import  Ospf from 'pages/internet/ospf'
import  Pim from 'pages/internet/pim'
import  Rip from 'pages/internet/rip'
import RootPage from 'pages/rootpage'
import Ipsec from 'pages/vpn/ipsec'
import StaticRoutes from 'pages/internet/router'
import { Logout } from 'components/antd/logout-box'

export default createBrowserRouter([
  {
    path: '/login',
    element: <PageLogin />,
  },
  {
    path: '/',
    element: <RootPage />,
    children: [
  {
    path: '/',
    element: <StatusOverviewPage />,
  },
  {
    path: 'network',
    children: [
      {
        path: 'igmp',
        element: <NetworkInterfacesPage />
      },
      {
        path: 'vlan',
        element: <NetworkVlan />
      },
      {
        path: 'mac',
        element: <NetworkMac />
      },
      {
        path: 'lan',
        element: <NetworkLan />
      },
      {
        path: 'lldp',
        element: <NetworkLldp />
      },
      {
        path: 'stp',
        element: <NetworkStp />
      },
      {
        path: 'portmirroring',
        element: <NetworkPortmirror />
      },
      {
        path: 'lag',
        element: <NetworkLag />
      },
      {
        path: 'bonding',
        element: <NetworkBonding />
      },
      {
        path: 'basicwifi',
        element: <WirelessInterfacesPage />
      }
    ],
  },
  {
    path: 'internet',
    children: [
      {
        path: 'wan',
        element: <WanSettingPage />,
      },
      {
        path: 'ddns',
        element: <DdnsSettingPage />,
      },
      {
        path: 'openvpn',
        element: <OpenVpnInternet />,
      },
      {
        path: 'routing',
        element: <StaticRoutes />,
      },
      {
        path: 'bfd',
        element: <Bfd />,
      },
      {
        path: 'bgp',
        element: <Bgp />,
      },
      {
        path: 'isis',
        element: <Isis />,
      },
      {
        path: 'ospf',
        element: <Ospf />,
      },
      {
        path: 'pim',
        element: <Pim />,
      },
      {
        path: 'rip',
        element: <Rip />,
      },
    ],
  },
  {
    path: 'security',
    children: [
      {
        path: 'portforward',
        element: <PortForward />,
      },
      {
        path: 'ipfilter',
        element: <Ipfilter />,
      },
      {
        path: 'urlfilter',
        element: <URLfilter />,
      },
      {
        path: 'nat64',
        element: <Nat64 />,
      },
      {
        path: 'linksafepolicy',
        element: <Linksafepolicy />,
      },
    ],
  },
  {
    path: 'vpn',
    children: [
      {
        path: 'l2tp',
        element: <L2TP />,
      },
      {
        path: 'vxlan',
        element: <VXLAN />,
      },
      {
        path: 'gre',
        element: <GRE />,
      },
      {
        path: 'ipsec',
        element: <Ipsec />,
      },
      {
        path: 'pptp',
        element: <PPTP />,
      },
      {
        path: 'vti',
        element: <VTI />,
      },
      {
        path: '6to4',
        element: <T04 />,
      },
    ],
  },
  {
    path: 'linksafe',
    children: [
      {
        path: 'register',
        element: <ResgisLinksafe />,
      },

    ],
  },
  {
    path: 'service',
    children: [
      {
        path: 'ntp',
        element: <NptService />,
      },
      {
        path: 'dns',
        element: <DnsService />,
      },
      {
        path: 'multimedia',
        element: <MultiService />,
      },

    ],
  },
  {
    path: 'system',
    children: [
      {
        path: 'arp',
        element: <ArpSystem />,
      },
      {
        path: 'update',
        element: <UlSystem />,
      },
      {
        path: 'reboot',
        element: <RebootSystem />,
      },
      {
        path: 'shutdown',
        element: <ShutdownSystem />,
      },
      {
        path: 'rsfactory',
        element: <FactorySystem />,
      },
      {
        path: 'ping',
        element: <PingSystem />,
      },
      {
        path: 'system',
        element: <SettingsSystem />,
      },
      {
        path: 'traceroute',
        element: <PacketSystem />,
      },
    ],
  },
  {
    path: '/logout',
    element: <Logout />,
  }
],
  }
])
