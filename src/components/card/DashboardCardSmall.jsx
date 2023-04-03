import React from 'react'

const DashboardCardSmall = ({ cardClass, text, count }) => {
  return (
    <div className="col-xl-3 col-md-6">
        <div className={`card ${cardClass} text-white mb-4`}>
            <div className="card-body">
                <div className="inner">
                    <div className="text-total">{count}</div>
                    <p>{text}</p>
                </div>
            </div>
            {/* <div className="card-footer d-flex align-items-center justify-content-between">
                <p className="small-box-footer">Total: 5124</p>
            </div> */}
        </div>
    </div>
  )
}

export default DashboardCardSmall