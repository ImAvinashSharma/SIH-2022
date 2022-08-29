import React ,{ useState, useEffect} from "react";
import  Chart  from "react-apexcharts";

function LineChart({dvalues, xcategories, title}) {
  return (
    <div  className="flex justify-center items-center overflow-x-auto">
        <Chart 
        type="line"
        // width={800}
        // height={400}
        width={345}
        height={300}

        series={[{ name:"abc", data:dvalues }]}             
        options={{
                title:{ text: "",
                    align: 'center',
                } , 
            noData:{text:"Empty Data"},                        
            // colors:["#f90000","#f0f"],
            xaxis: {
              categories: xcategories
            }                     

        }}
        >
        </Chart>
    </div>
  )
}

export default LineChart