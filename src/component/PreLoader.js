import React from 'react'
import './Preloader.css'
function PreLoader() {
    return (
        <div className="preloaded">
        <div className="preloader">
            <div className="lines">
                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
                <div className="line line-4"></div>
            </div>
            <div className="loading-text">PROCESSING</div>
        </div>
    </div>
    )
}

export default PreLoader
