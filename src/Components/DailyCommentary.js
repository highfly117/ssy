import { useEffect, useState } from "react";
import "./CSS/DailyCommentary.css";
import axios from "axios";




const DailyCommentary = ({ selectedDate }) => {
    const [DailyCommentary, setDailyCommentary] = useState(null)
    
    const apiKey = 'BJ8uqhNZRSuPaXqC';
    let date = selectedDate.toISOString().split('T')[0].replace(/-/g, '');
    const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;


    useEffect(() => {

        const loadDailyCommentary = async () => {
            //console.log(`https://www.ssyreports.com/api/ExampleEodCommentary/${apiKey}/${date}`)
            const response = await axios.get(`https://www.ssyreports.com/api/ExampleEodCommentary/${apiKey}/${date}`)
            setDailyCommentary(response.data)
            //console.log(response.data)
        }

        loadDailyCommentary()


    }, [selectedDate])


    return (
        <div className="DailyCommentaryWrapper">
            <h1>Daily Commentary: {formattedDate}</h1>
            {DailyCommentary ? (
                <div>
                    <h5 style={{marginTop:"15px"}}>{DailyCommentary[0].commentCode}</h5>
                    <div dangerouslySetInnerHTML={{ __html: DailyCommentary[0].comment }} />
                    <h5 style={{marginTop:"15px"}}>{DailyCommentary[1].commentCode}</h5>
                    <div dangerouslySetInnerHTML={{ __html: DailyCommentary[1].comment }} />
                </div>
            ) : (<div>loading</div>)}
        </div>
    );
}

export default DailyCommentary