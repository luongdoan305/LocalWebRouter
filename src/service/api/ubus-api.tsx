import axios from 'axios'

const UBUS_PATH = 'ubus'
const DEFAULT_SESSION = '00000000000000000000000000000000'

class UbusApi {
  ubusRpcSession = DEFAULT_SESSION

  _instance: any = null
  _reqId = 1

  constructor(baseURL = '/') {
    console.log('Creating api instance', baseURL)
    this._instance = axios.create({ baseURL, timeout: 25000 })
  }

  cleanInit() {
    this.ubusRpcSession = DEFAULT_SESSION
  }

  ubusCall = async (section: any, method: any, param = {}) => {
    const inst: any = this._instance

    let tokenString = sessionStorage.getItem('token');

    if (method === 'login') {
      tokenString = DEFAULT_SESSION
    }

    try {
      const reqBody = {
        jsonrpc: '2.0',
        id: this._reqId++,
        method: 'call',
        params: [tokenString, section, method, param],
      }
      // console.log('reqBody', reqBody)
      const resp = await inst.post(UBUS_PATH, reqBody)



      if (resp.status === 200 || resp.status === 201) {
        const { /*jsonrpc, id,*/ result, error } = resp.data
        if (error) {
          // code -32002; Access denied
          // console.log(resp.data)
          if (error.code === -32002) {
            sessionStorage.removeItem('token')
            window.location.href = '/'
          }
          return error
        } else if (Array.isArray(result) && result.length > 0) {
          // code 2 = invalid param ?
          return { code: result[0], data: result[1] }
        } else {
          return { code: -1, message: 'Invalid response', data: resp.data }
        }
      } else {
        return { code: -2, message: 'Unexpected status', data: resp.data }
      }
    } catch (err: any) {
      console.log('err', err)
      return { code: -3, message: `${err.code} | ${err.message}` }
    }
  }

  login = async (username: any, password = '') => {
    const respData = await this.ubusCall('session', 'login', {
      username,
      password,
    })
    if (respData.code === 0) {
      const { ubus_rpc_session /*timeout, expires*/ } = respData.data
      this.ubusRpcSession = ubus_rpc_session
    } else {
      console.log('LoginError', respData)
    }
    return respData
  }

  systemInfo() {
    let data=this.ubusCall('linksafe', 'dashboard')
    return data
  }

  async uciGet(config: any, section: any, option: any) {
    const result = await this.ubusCall('uci', 'get', {
      "config":config,
      "section":section,
    })
    if (result.code) {
      return {}
    }
    const data: any = {
      name: config,
      sections: Object.values(result.data),
    }
    return data
  }

  async uciSet(config: any, section: any, values: any) {
    const result = await this.ubusCall('uci', 'set', {
      config,
      section,
      values,
    })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async uciChanges(config: any) {
    const result = await this.ubusCall('uci', 'changes', { config })
    if (result.code) {
      console.log(result)
      return {}
    }
    // const { changes } = result.data
    // {"changes": {
    //   "system": [["set", "cfg01e48a", "hostname", "OpenWrt-Vbox"]]
    // }}
    return result.data
  }

  async uciApply(rollback: any) {
    const result = await this.ubusCall('uci', 'apply', { rollback, timeout: 25 })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async uciCommit(config: any) {
    const result = await this.ubusCall('uci', 'commit', { config })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  logout() {
    this.cleanInit()
  }

  ////function web local

  async linksafe_get_uuid() {
    const result = await this.ubusCall('linksafe', 'linksafe_get_uuid', {})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_lan(ifname: any, protov4: any, ipv4: any, netmask: any, protov6: any, ipv6: any) {
    const result = await this.ubusCall('linksafe', 'config_network_lan', { "param": [{ "protov4": protov4, "ipaddrv4": ipv4, "netmask": netmask, "protov6": protov6, "ipaddrv6": ipv6 }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_wireless(disabled: any, ssid: any, encryption: any, key: any) {
    const result = await this.ubusCall('linksafe', 'config_network_wireless', { "param": [{ "disabled": disabled, "ssid": ssid, "key": key, "encryption": encryption }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async config_network_guest(disabled: any, ssid: any, encryption: any, key: any, limit: any, unit: any) {
    console.log("result: ", disabled, ssid, encryption, key, limit, unit)
    if (limit === null) {
      const result = await this.ubusCall('linksafe', 'config_network_guest', { "param": [{ "disabled": disabled, "ssid": ssid, "key": key, "encryption": encryption }] })
      if (result.code) {
        return {}
      }
      return result.data
    } else {
      const result = await this.ubusCall('linksafe', 'config_network_guest', { "param": [{ "disabled": disabled, "ssid": ssid, "key": key, "encryption": encryption, "limit_values": limit, "limit_unit": unit }] })
      if (result.code) {
        return {}
      }
      return result.data
    }
  }

  async config_network_wan( status : any, ifname: any, name: any, link_type: any, protov4: any, username: any, password: any, timeout: any, ipaddrv4: any, netmaskv4: any, gatewayv4: any, protov6: any, ipaddrv6: any, gatewayv6: any) {
    switch (protov4) {
      case 'static':
        switch (protov6) {
          case 'static':
            const result1 = await this.ubusCall('linksafe', 'config_network_wan', { "param": [{ "status": status, "link_type":link_type, "ifname": ifname, "name": name, "protov4": protov4, "username": username, "password": password, "timeout": timeout, "ipaddrv4": ipaddrv4, "netmaskv4": netmaskv4, "gatewayv4": gatewayv4, "protov6": protov6, "ipaddrv6": ipaddrv6, "gatewayv6": gatewayv6 }] })
            if (result1.code) {
              console.log(result1)
              return {}
            }
            return {};
          default:
            const result2 = await this.ubusCall('linksafe', 'config_network_wan', { "param": [{ "status": status, "link_type":link_type, "ifname": ifname, "name": name, "protov4": protov4,  "username": username, "password": password, "timeout": timeout, "ipaddrv4": ipaddrv4, "netmaskv4": netmaskv4, "gatewayv4": gatewayv4, "protov6": protov6 }] })
            if (result2.code) {
              console.log(result2)
              // console.log(result2_wan6)
              return {}
            }
        }
        return {};
      default:
        switch (protov6) {
          case 'static':
            const result1 = await this.ubusCall('linksafe', 'config_network_wan', { "param": [{ "status": status, "link_type":link_type, "ifname": ifname, "name": name, "protov4": protov4,  "username": username, "password": password, "timeout": timeout, "protov6": protov6, "ipaddrv6": ipaddrv6, "gatewayv6": gatewayv6 }] })
            if (result1.code) {
              console.log(result1)
              // console.log(result1_wan6)
              return {}
            }
            return {};
          default:
            const result2 = await this.ubusCall('linksafe', 'config_network_wan', { "param": [{ "status": status, "link_type":link_type, "ifname": ifname, "name": name, "protov4": protov4,  "username": username, "password": password, "timeout": timeout, "protov6": protov6 }] })
            if (result2.code) {
              console.log(result2)
              // console.log(result2_wan6)
              return {}
            }
        }
    }
  }

  async show_network_wireless() {
    const result = await this.ubusCall('linksafe', 'show_network_wireless')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_guest() {
    const result = await this.ubusCall('linksafe', 'show_network_guest')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_wan_congfig() {
    const result = await this.ubusCall('linksafe', 'show_network_wan_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_ddns(provider: any, enabled: any, mode: any, url: any, username: any, password: any, domain: any) {
    const result = await this.ubusCall('linksafe', 'config_network_ddns', { "param": [{ "provider": "DynDNS", "enabled": enabled, "mode": mode, "url": url, "username": username, "password": password, "domain": domain }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_ddns() {
    const result = await this.ubusCall('linksafe', 'show_network_ddns')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_routing() {
    const result = await this.ubusCall('linksafe', 'show_network_routing')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_static(status: any, target: any, nexthop: any, metric: any, device: any) {
    const result = await this.ubusCall('linksafe', 'config_network_static', { "param": [{ "status": status, "target": target, "nexthop": nexthop, "metric": metric, "device": device }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_nat(status: any, name: any, protocol: any, wan_ip: any, wan_port: any, lan_ip: any, lan_port: any) {
    const result = await this.ubusCall('linksafe', 'config_network_nat', { "param": [{ "status": status, "name": name, "protocol": protocol, "wan_ip": wan_ip, "wan_port": wan_port, "lan_ip": lan_ip, "lan_port": lan_port }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_nat() {
    const result = await this.ubusCall('linksafe', 'show_network_nat')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_lan_config() {
    const result = await this.ubusCall('linksafe', 'show_network_lan_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_lan() {
    const result = await this.ubusCall('linksafe', 'show_network_lan')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_dhcp_config() {
    const result = await this.ubusCall('linksafe', 'show_network_dhcp_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_dhcp(dhcpv4_status: any, dhcpv6_status: any, start: any, end: any, leasetime: any) {
    const result = await this.ubusCall('linksafe', 'config_network_dhcp', { "param": [{ "dhcpv4status": dhcpv4_status, "dhcpv6status": dhcpv6_status, "start": start, "end": end, "leasetime": leasetime }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_dns(primary: any, secondary: any) {
    const result = await this.ubusCall('linksafe', 'config_network_dns', { "param": [{ "primary": primary, "secondary": secondary }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_network_lldp(run: any) {
    const result = await this.ubusCall('linksafe', 'config_network_lldp', { "param": [{ "run": run }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async show_network_lldp() {
    const result = await this.ubusCall('linksafe', 'show_network_lldp')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_nat64(status: any, interfacee: any, instance_name: any, ipv6_address: any) {
    const result = await this.ubusCall('linksafe', 'config_network_nat64', { "param": [{ "status": status, "interface": interfacee, "instance_name": instance_name,"ipv6_address_pool":ipv6_address }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_dns_config() {
    const result = await this.ubusCall('linksafe', 'show_network_dns_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_dhcp_leases() {
    const result = await this.ubusCall('linksafe', 'show_network_dhcp_leases')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_vlan() {
    const result = await this.ubusCall('linksafe', 'show_network_vlan')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_vlan(mode: any, action: any, name: any, vid: any, interfaces: any) {
    if (mode === "access") {
      const result = await this.ubusCall('linksafe', 'config_network_vlan', { "param": [{ "access": { "action": action, "name": name, "vid": vid, "interface": interfaces } }] })
      if (result.code) {
        console.log(result)
        return {}
      }
      return result.data
    } else {
      const result = await this.ubusCall('linksafe', 'config_network_vlan', { "param": [{ "trunk": { "action": action, "interface": interfaces, "vid": vid } }] })
      if (result.code) {
        console.log(result)
        return {}
      }
      return result.data
    }
  }

async show_network_multicast() {
  const result = await this.ubusCall('linksafe', 'show_network_multicast')
  if (result.code) {
    console.log(result)
    return {}
  }
  // console.log(result)
  return result.data
}


  /* system function */

  async config_system(hostname: any, timezone: any) {
    const result = await this.ubusCall('linksafe', 'config_system', {"param":[{"hostname": hostname,"timezone": timezone}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_reboot() {
    const result = await this.ubusCall('linksafe', 'config_system_reboot', {})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_shutdown() {
    const result = await this.ubusCall('linksafe', 'config_system_shutdown', {})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_rsfactory() {
    const result = await this.ubusCall('linksafe', 'config_system_factory', {})
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_ping(props: any) {
    const { hostname, version, source, max, second, ttl } = props
    const result = await this.ubusCall('linksafe', 'config_system_ping', { "param": [{ "hostname": hostname, "version": version, "count": max, "sec": second, "ttl": ttl, "source": source}] })
    if (result.code) {
     // console.log('ping',result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_traceroute(props: any) {
    const { hostname, version, source, max, second, ttl } = props
    const result = await this.ubusCall('linksafe', 'config_system_traceroute', { "param": [{ "hostname": hostname, "version": version, "count": max, "sec": second, "ttl": ttl, "source": source}] })
    if (result.code) {
     // console.log('ping',result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_password(props: any) {
    const { current_password, new_password } = props
    const result = await this.ubusCall('linksafe', 'config_system_password', { "param": [{ "oldpass": current_password, "newpass": new_password}] })
    if (result.code) {
     // console.log('ping',result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_system_update() {
    const result = await this.ubusCall('linksafe', 'config_system_update', { })
    if (result.code) {
     // console.log('ping',result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  /* acl function */
  async config_url_filter(name: any, action: any, type: any, url: any) {
    const result = await this.ubusCall('linksafe', 'config_acl', { "param": [{ "name": name, "action": action, "type": type, "url": url }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_l2tp(status: any, local_address: any,remote_address: any, network: any) {
    const result = await this.ubusCall('linksafe', 'config_l2tp', { "param": [{ "status": status, "local_address": local_address, "remote_address": remote_address, "network": network }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async show_l2tp() {
    const result = await this.ubusCall('linksafe', 'show_l2tp')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_vxlan(status: any, vxlan_name: any,remote_address : any, network: any, netmask: any, port: any, mtu: any, vlan: any  ) {
    const result = await this.ubusCall('linksafe', 'config_vxlan', { "param": [{ "status": status, "vxlan_name": vxlan_name, "remote_address": remote_address, "network": network, "netmask":netmask, "port": port, "mtu": mtu, "vlan":vlan }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async show_vxlan() {
    const result = await this.ubusCall('linksafe', 'show_vxlan')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result) 
    return result.data
  }


  async config_gre(status: any, gre_name: any,local_address: any, remote_address : any, network: any, netmask: any) {
    const result = await this.ubusCall('linksafe', 'config_gre', { "param": [{ "status": status, "gre_name": gre_name,"local_address":local_address ,"remote_address": remote_address, "network": network, "netmask":netmask}] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async show_gre() {
    const result = await this.ubusCall('linksafe', 'show_gre')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result) 
    return result.data
  }
  async config_pptp_server( status: any, range_from: any, range_to: any, username: any, password: any) {
    const result = await this.ubusCall('linksafe', 'config_pptp_server', { "param": [{ "status": status, "range_from": range_from, "range_to": range_to, "username": username, "password": password }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async show_pptp_server() {
    const result = await this.ubusCall('linksafe', 'show_pptp_server')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result) 
    return result.data
  }
  async config_pptp_client( status: any, serverip: any, username: any, password: any, pptp_route: any ) {
    const result = await this.ubusCall('linksafe', 'config_pptp_client', { "param": [{  "status": status, "serverip": serverip, "pptp_route": pptp_route, "username": username, "password": password }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async show_pptp_client() {
    const result = await this.ubusCall('linksafe', 'show_pptp_client')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result) 
    return result.data
  }
  async show_url_filter() {
    const result = await this.ubusCall('linksafe', 'show_acl')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result) 
    return result.data
  }

  async show_ip_filter() {
    const result = await this.ubusCall('linksafe', 'show_acl')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_ip_filter(name: any, action: any, type: any, src: any, dest: any, sport: any, dport: any, tcp_udp: any) {
    const result = await this.ubusCall('linksafe', 'config_acl', { "param": [{ "name": name, "action": action, "type": type, "src": src, "dest": dest, "sport": sport, "dport": dport, "tcp_udp": tcp_udp }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_mesh_controller(enabled: any, ssid: any, key: any) {
    const result = await this.ubusCall('linksafe', 'config_mesh_controller', { "param": [{ "enabled": enabled, "ssid": ssid, "key": key }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_mesh_agent(enabled: any) {
    const result = await this.ubusCall('linksafe', 'config_mesh_agent', { "param": [{ "enabled": enabled }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async show_mesh_config() {
    const result = await this.ubusCall('linksafe', 'show_mesh_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_mesh_table() {
    const result = await this.ubusCall('linksafe', 'show_mesh_table',)
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async config_network_openvpn_server(action: any, name: any, status: any, mode: any, port: any, subnet: any, netmask: any, client_access: any, crt: any, key: any, ca: any) {
    const result = await this.ubusCall('linksafe', 'config_network_openvpn', { "param": [{ "action": action, "name": name, "status": status, "mode": mode, "port": port, "subnet": subnet, "netmask": netmask,  "client_access": client_access, "crt": crt, "key": key, "ca": ca }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_ipsec(tunnel_name: any, key: any, local_id: any, remote_id: any, local_address: any, remote_address: any, local_subnet: any, remote_subnet: any, ike_encrypt: any, ike_hash: any, ike_dh: any, esp_encrypt: any, esp_hash: any, esp_dh: any,) {
    const result = await this.ubusCall('linksafe', 'config_ipsec_add', { "param": [{ "tunnel_name": tunnel_name, "key": key, "local_id": local_id, "remote_id": remote_id, "local_address": local_address, "remote_address": remote_address, "local_subnet": local_subnet,  "remote_subnet": remote_subnet, "ike_encrypt": ike_encrypt, "ike_hash": ike_hash, "ike_dh": ike_dh, "esp_encrypt": esp_encrypt, "esp_hash": esp_hash, "esp_dh": esp_dh }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async show_ipsec() {
    const result = await this.ubusCall('linksafe', 'show_ipsec')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }
  async config_ipsec_del(tunnel_name: any) {
    const result = await this.ubusCall('linksafe', 'config_ipsec_del', { "param": [{ "tunnel_name": tunnel_name }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async show_network_openvpn() {
    const result = await this.ubusCall('linksafe', 'show_network_openvpn')
    if (result.code) {
      console.log(result)
      return {}
    }
    // console.log(result)
    return result.data
  }

  async config_network_openvpn_client(action: any, name: any, status: any, mode: any, server_ip: any, server_port: any, crt: any, key: any, ca: any) {
    const result = await this.ubusCall('linksafe', 'config_network_openvpn', { "param": [{ "action": action, "name": name, "status": status, "mode": mode, "server_ip": server_ip, "server_port": server_port, "crt": crt, "key": key, "ca": ca }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async config_network_openvpn_del(name: any) {
    const result = await this.ubusCall('linksafe', 'config_network_openvpn', { "param": [{ "action": "del", "name": name }]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_openvpn_dev( action: any, crt: any, key:any, ca :any) {
    const result = await this.ubusCall('linksafe', 'config_network_openvpn', { "param": [{ "action": "del_crt", "crt": crt ,"key" : key, "ca": ca}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_openvpn_list(folder: any) {
    const result = await this.ubusCall('linksafe', 'show_list_folder', { "param": folder})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async show_network_relay() {
    const result = await this.ubusCall('linksafe', 'show_network_relay')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async config_network_relay(statusv4: any, statusv6: any) {
    const result = await this.ubusCall('linksafe', 'config_network_relay', { "param": [{"statusv4": statusv4, "statusv6": statusv6}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_mesh_topology() {
    const result = await this.ubusCall('linksafe', 'show_mesh_topology')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_arp() {
    const result = await this.ubusCall('linksafe', 'show_network_arp')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_stp() {
    const result = await this.ubusCall('linksafe', 'show_network_stp')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_mirror() {
    const result = await this.ubusCall('linksafe', 'show_network_mirror')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_mirror(action: any, src: any, dest: any, direct: any) {
    const result = await this.ubusCall('linksafe', 'config_network_mirror', { "param": [{ "action": action, "src": src, "dest": dest, "direct": direct }] })
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_dns() {
    const result = await this.ubusCall('linksafe', 'show_network_dns_config')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_policy() {
    const result = await this.ubusCall('linksafe', 'show_policy')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_dns(primary: any, secondary: any) {
    const result = await this.ubusCall('linksafe', 'config_network_dns', { "param": [{"primary": primary, "secondary": secondary}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_mac() {
    const result = await this.ubusCall('linksafe', 'show_network_mac')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_mac(action: any, vlan: any, mac: any, dev:any  ) {
    const result = await this.ubusCall('linksafe', 'config_network_mac', { "param": [{"action": action, "vlan": vlan, "mac":mac, "dev":dev}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_ntp() {
    const result = await this.ubusCall('linksafe', 'show_network_ntp')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_ntp(enabled: any, enable_server: any, server:any, name: any ) {
    const result = await this.ubusCall('linksafe', 'config_network_ntp', { "param": [{"enabled": enabled, "enable_server":enable_server, "server": server, "name": name}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_media_digits() {
    const result = await this.ubusCall('linksafe', 'show_media_digits')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_media_digits(action: any, digits: any ) {
    const result = await this.ubusCall('linksafe', 'config_media_digits', { "param": [{"action": action, "digits":digits}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_media_number() {
    const result = await this.ubusCall('linksafe', 'show_media_number')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_media_number(action: any, number: any,username: any, password: any, option:any) {
    const result = await this.ubusCall('linksafe', 'config_media_number', { "param": [{"action": action, "number":number, "username": username, "password":password, "option": option}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }

  async show_media_trunk() {
    const result = await this.ubusCall('linksafe', 'show_media_trunk')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_media_trunk(action: any, digits: any, name: any, address: any, port:any, option:any ) {
    const result = await this.ubusCall('linksafe', 'config_media_trunk', { "param": [{"action": action, "digits":digits, "name": name, "address":address, "port": port, "option":option}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_media_ivr() {
    const result = await this.ubusCall('linksafe', 'show_media_ivr')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_media_ivr(status: any, number: any, music: any, button_num: any, sip_phone:any, name:any ) {
    const result = await this.ubusCall('linksafe', 'config_media_ivr', { "param": [{"status": status, "number":number, "music": music, "button":[{"button_num":button_num,"sip_phone": sip_phone, "name":name}] }]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_bonding(action: any, id: any, ipaddr : any,mask : any ) {
    const result = await this.ubusCall('linksafe', 'config_network_bonding', { "param": [{"action": action, "id":id, "ipaddr":ipaddr , "mask":mask}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_bonding() {
    const result = await this.ubusCall('linksafe', 'show_network_bonding')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_bgp() {
    const result = await this.ubusCall('linksafe', 'show_network_bgp')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_bgp(status: any, router_id : any, as_number : any, neighbor_ip: any, log: any, m_eigrp: any,m_connected:any,m_bgp :any, m_isis:any, m_rip:any, m_static:any) {
    const result = await this.ubusCall('linksafe', 'config_network_bgp', { "param": [{"status": status, "router_id": router_id, "as_number": as_number, "neighbor_ip":[ neighbor_ip ], "log_neighbor_changer": log,"eigrp_redistribute": m_eigrp, "bgp_redistribute": m_bgp,"connected_redistribute":m_connected, "isis_redistribute":m_isis, "rip_redistribute":m_rip, "static_redistribute":m_static }]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_isis(status: any, router_id: any, type: any, net: any, log:any) {
    const result = await this.ubusCall('linksafe', 'config_network_isis', { "param": [{"status": status, "router_id": router_id, "type": type, "net": net, "log": log}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_isis_interface(status: any, m_interface: any, router_id: any, circurit_type: any, priority: any, priority_type: any) {
    const result = await this.ubusCall('linksafe', 'config_network_isis_interface', { "param": [{"status": status, "interface": m_interface, "router_id": router_id, "circurit_type": circurit_type, "priority": priority, "priority_type": priority_type}]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_isis_interface() {
    const result = await this.ubusCall('linksafe', 'show_network_isis_interface')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_isis() {
    const result = await this.ubusCall('linksafe', 'show_network_isis')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_ospf() {
    const result = await this.ubusCall('linksafe', 'show_network_ospf')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_ospf(status: any, area : any, network : any, m_eigrp: any,m_connected:any,m_bgp :any, m_isis:any, m_rip:any, m_static:any) {
    const result = await this.ubusCall('linksafe', 'config_network_ospf', { "param": [{"status": status, "area": area, "network":[ network ], "eigrp_redistribute": m_eigrp, "bgp_redistribute": m_bgp,"connected_redistribute":m_connected, "isis_redistribute":m_isis, "rip_redistribute":m_rip, "static_redistribute":m_static }]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async show_network_rip() {
    const result = await this.ubusCall('linksafe', 'show_network_rip')
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
  async config_network_rip(status: any, mode : any, network : any, m_eigrp: any,m_connected:any,m_bgp :any, m_isis:any, m_ospf:any,  m_static:any) {
    const result = await this.ubusCall('linksafe', 'config_network_rip', { "param": [{"status": status, "mode": mode, "network":[ network ], "eigrp_redistribute": m_eigrp, "bgp_redistribute": m_bgp,"connected_redistribute":m_connected, "isis_redistribute":m_isis, "ospf_redistribute":m_ospf, "static_redistribute":m_static }]})
    if (result.code) {
      console.log(result)
      return {}
    }
    return result.data
  }
}

export default new UbusApi("https://192.168.15.63/")

