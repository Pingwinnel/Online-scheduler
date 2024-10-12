
import moment from "moment";
import Calendar from "../Calendar";





function App() {
    moment.updateLocale('en',{week:{dow:1}});
    const today=moment();
    const startDay=today.startOf('month').startOf('week');


  return (
      <div className={"container"}>
    <Calendar></Calendar>
      </div>
  );
}

export default App;
