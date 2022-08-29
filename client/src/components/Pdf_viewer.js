import React from 'react';
import { Viewer, SpecialZoomLevel, ProgressBar} from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

function Pdf_viewer({className, selectedFile}) {
  return (
    <div className={className? className: "p-4"} style={className? {} : {border: '1px solid rgba(0, 0, 0, 0.3)',
    height: '750px',}}>
        <Viewer fileUrl={selectedFile}  defaultScale={SpecialZoomLevel.PageFit} renderLoader={(percentages) => (
        <div style={{ width: '240px' }}>
            <ProgressBar progress={Math.round(percentages)} />
        </div>
    )} />
    </div>
  );

}

export default Pdf_viewer