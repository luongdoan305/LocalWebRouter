import { Button, Col, Form, Input, Row, Typography, Checkbox, Tooltip } from 'antd'
import api from '../../service/api/ubus-api'
import BgProfile from "../../assets/icon/bg.png";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import { LocaleSwitch } from "../../translations/i18n"
import { LockOutlined, UserOutlined, DingtalkOutlined, InfoCircleOutlined, SyncOutlined } from '@ant-design/icons';
import React from 'react';
import { redirect } from 'react-router-dom';

export const LoginForm = () => {

	const { t } = useTranslation();
	const u = t('fill_username')
	const p = t('fill_password')
	const [form] = Form.useForm();
	const [, forceUpdate] = React.useState({});
	React.useEffect(() => {
		forceUpdate({});
	}, []);

	const onFinish = async (values: any) => {
		const result = await api.login(values.username, values.password)
		if (result.code === 0) {
			const { ubus_rpc_session /*timeout, expires*/ } = result.data
			sessionStorage.setItem('token', ubus_rpc_session);
			window.location.href = '/'
		}
	}

	const onClick = async () => {
		const ip = window.location.href.split('/')[2]
		window.location.replace('http://'+ip+':2050')
	}

	return (
		<>
			<Typography.Title level={1} style={{
				textAlign: 'center',
				fontSize: '70px',
				fontWeight: '600',
				color: '#957dad',
				backgroundClip: 'text',
				WebkitBackgroundClip: 'text',
				// textTransform: 'uppercase',
				textShadow: "1px 1px 0px #8268886e,1px 2px 0px #8268886e,1px 3px 0px #957dad,1px 4px 0px #957dad,1px 5px 0px #957dad,1px 6px 0px #826888,1px 10px 5px #826888,1px 15px 10px #826888,1px 20px 30px #826888,1px 25px 50px #826888",
			}}>Lancs Network</Typography.Title>
			<Form form={form} layout="vertical" onFinish={onFinish}>
				<Form.Item name="username" rules={[{ required: true, message: u }]}>
					<Input placeholder={u} prefix={<UserOutlined className="site-form-item-icon" />}
						suffix={
							<Tooltip title={t('ex')}>
								<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
							</Tooltip>
						} />
				</Form.Item>
				<Form.Item name="password" rules={[{ required: true, message: p }]}>
					<Input.Password placeholder={p} prefix={<LockOutlined className="site-form-item-icon" />} />
				</Form.Item>
				<Row>
					<Col md={17}>
						<Form.Item shouldUpdate>
							{() => (
								<Button htmlType="submit" type="primary" size='large' icon={<DingtalkOutlined />} disabled={
									!form.isFieldsTouched(true) ||
									!!form.getFieldsError().filter(({ errors }) => errors.length).length
								} style={{
									textTransform: 'uppercase',
								}}>{t("login")}</Button>
							)}
						</Form.Item>
					</Col>
					<Col md={7}>
						<Button size='large' type="primary" onClick={onClick} icon={<SyncOutlined />}>
							{t("Switch_Account")}
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	)
}

export const LoginBox = (props: any) => {
	return (
		<>
			<LocaleSwitch />
			<div
				style={{
					width: '100%',
					height: '100vh',
					backgroundImage: "url(" + BgProfile + ")",
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
					<Row justify={'center'} style={{ justifySelf: 'auto' }}>
						<Col xs={24} sm={12} xxl={8}>
							<LoginForm {...props} />
						</Col>
					</Row>
				</div>
			</div>
		</>
	)
}
