import {useEffect, useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from "axios";

import "./CSS/Chart.css"

const Chart = ({ selectedDate }) => {
    const [CapeIndexChart, setCapeIndex] = useState(null)


    const apiKey = 'BJ8uqhNZRSuPaXqC';
    let date = selectedDate.toISOString().split('T')[0].replace(/-/g, '');
    const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    
    useEffect(() => {
        const CapeIndexTable = async () => {
           // console.log(`https://www.ssyreports.com/api/ExampleEodCapeIndex/${apiKey}/${date}`)
            const response = await axios.get(`https://www.ssyreports.com/api/ExampleEodCapeIndex/${apiKey}/${date}`)
            const data = response.data.map(item => {
              const dateParts = item.priceDate.split('T')[0].split('-');
              return {
                x: Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]),  
                y: item.price
              }
            });
            setCapeIndex(data)
          }
          
          CapeIndexTable()
          
    }, [selectedDate])

    useEffect(() => {
        //console.log(CapeIndexChart)
    }, [CapeIndexChart])

    const options = {
            title: {
              text: null, 
            },
            xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                day: '%e. %b',
                month: '%b \'%y',
                year: '%Y'
              }
            },
            yAxis: {
              title: {
                text: 'Price',  
              },
            },
            series: [
              {
                name: 'Cape Index',
                data: CapeIndexChart,
                showInLegend: false,  
              },
            ],
    };

    return (
        <div className="CapeIndexChart">
            <h1>Cape Index Chart: {formattedDate}</h1>
            {CapeIndexChart ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    containerProps={{ style: { height: '85%' } }}
                />
            ) : (<div>loading</div>)}
        </div>
    )
}

export default Chart
