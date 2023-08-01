import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';
import styled from 'styled-components';

const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const Wrapper = styled.div`
  width: 1000px; 
  border: 1px solid ${(props) => props.theme.colorBorderSecondary};
  border-radius: ${(props) => props.theme.borderRadiusLG};

  @media (max-width: 768px) {
    width: 100%; 
  }
`;

const CalendarPage = () => {
  const { token } = theme.useToken();

  return (
    <Wrapper theme={token}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </Wrapper>
  );
};

export default CalendarPage;