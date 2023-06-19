import { useEffect, useState } from 'react';
import './App.css';
import TopBar from './Components/Topbar';
import RouteTable from './Components/RouteTable'
import axios from 'axios';
import DailyCommentary from './Components/DailyCommentary';
import Chart from './Components/Chart';




function App() {

  const [routetabledata, setroutedata] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date() ) 

  const apiKey = 'BJ8uqhNZRSuPaXqC';
  
  let date = selectedDate.getFullYear().toString() + 
  ('0' + (selectedDate.getMonth() + 1)).slice(-2) +
  ('0' + selectedDate.getDate()).slice(-2);


  console.log(date)

  useEffect(() => {

    const loadRouteTable = async () => {
      //console.log(`https://www.ssyreports.com/api/ExampleEodPrices/${apiKey}/${date}`)
      const response = await axios.get(`https://www.ssyreports.com/api/ExampleEodPrices/${apiKey}/${date}`)

      setroutedata(response.data)

    }

    loadRouteTable()


  }, [selectedDate])


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <TopBar className="home_content" selectedDate={selectedDate} setSelectedDate={setSelectedDate}></TopBar>
      <div className='row dashboardwrapper' style={{ marginRight: "0px" }}>
        {routetabledata ? (

          <div className='col-6'>
            <RouteTable data={routetabledata}></RouteTable>
          </div>
        ) : (<div>loading</div>


        )}

        <div className='col-6'>
          <DailyCommentary selectedDate={selectedDate}></DailyCommentary>
          <Chart selectedDate={selectedDate}></Chart>
        </div>
      </div>
    </div>
  );
}

export default App;
