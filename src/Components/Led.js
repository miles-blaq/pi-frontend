import React from 'react'

const Led = (props) => {
    const {ledState,blink,isBlinking,ledErrMsg,toggle,blinkLed,btnState} = props
    return (
        <React.Fragment>
            <div className="toggleBtn">
            <button onClick={()=>toggle()} className="dib br-pill bg-navy washed-blue"> turn {btnState} lights</button> <span>  </span>
            <h2 className="dib i dark-green fw3"> {ledState}</h2>
            </div>
            <div className="blinkBtn">
            <button onClick={()=>blinkLed()} className="dib br-pill bg-navy washed-blue"> blink </button> <span> </span>
            {isBlinking?(<h2 className="dib i dark-green fw3">{blink} <span>(for 8 secs)</span></h2>) :null}
            </div>
             {ledErrMsg? <p className="errMsg fw8">{ledErrMsg}</p>: null}
        </React.Fragment>
    )
}

export default Led
