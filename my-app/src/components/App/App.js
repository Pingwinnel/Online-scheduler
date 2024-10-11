import Header from "../Header/Header";
import ControlsPanel from "../Controls/ControlsPanel";
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import moment from "moment";
import styled from 'styled-components';

const ShadowWrapper = styled('div')`
  min-width: 850px;
  height: auto;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow:hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
  display: flex;
  flex-direction: column;
`;



function App() {
    moment.updateLocale('en',{week:{dow:1}});
    const today=moment();
    const startDay=today.startOf('month').startOf('week');


  return (
    <ShadowWrapper>
      <Header></Header>
      <ControlsPanel></ControlsPanel>
      <CalendarGrid startDay={startDay}></CalendarGrid>
    </ShadowWrapper>
  );
}

export default App;
