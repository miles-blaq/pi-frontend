import React from 'react'

const Sensor = (props) => {
    return (
        <React.Fragment>
             <button onClick={()=>props.getTempAndHumidity()} className="br-pill tempBtn bg-navy washed-blue">
                get temp and humidity</button>
            { props.isLoading ? <p className="fw5 tc i dark-green">getting data..</p> : 
                <div>
                <div className="tempData">temperature</div>
                <div className="humidityData">humidity</div> <br/>
                {
                    props.temperature.length != "" ?
                    <div>
                    <div className="tempDisplay dataBox">{props.temperature} &#x2103;</div>
                    <div className="humidityDisplay dataBox">{props.humidity} % </div>
                    </div>
                    :null
                }
                </div>
            }
            {props.tempErr? <p className="errMsg fw8">{props.tempErr}</p>:null}
        </React.Fragment>
    )
}

export default Sensor
