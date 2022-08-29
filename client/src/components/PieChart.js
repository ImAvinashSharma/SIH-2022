import React ,{ useState, useEffect} from "react";
import  Chart  from "react-apexcharts";

function PieChart({dvalues, dlabels, title}) {
  return (
    <div  className="flex justify-center items-center overflow-x-auto">
        <Chart 
        type="pie"
        // width={1349}
        // height={550}
        width={350}
        height={400}
        series={ dvalues }                
        options={{
                title:{ text: title,
                    align: 'center',
                } , 
            noData:{text:"Empty Data"},                        
            // colors:["#f90000","#f0f"],
            labels: dlabels                     

        }}
        >
        </Chart>
    </div>
  )
}

export default PieChart