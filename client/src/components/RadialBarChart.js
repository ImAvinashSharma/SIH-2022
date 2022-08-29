import React ,{ useState, useEffect} from "react";
import  Chart  from "react-apexcharts";

function RadialBarChart({dvalues, dlabels, title}) {

  return (
    <div  className="flex justify-center items-center overflow-x-auto">
        <Chart 
        type="radialBar"
        // width={1349}
        // height={550}
        width={400}

        
        series={ dvalues }                
        options={{
                title:{ text: title,
                    align: 'center',
                } , 

            noData:{text:"Empty Data"},                        
            // colors:["#f90000","#f0f"],
            labels: dlabels ,
            plotOptions: {
              radialBar: {
                size: undefined,
                inverseOrder: false,
                startAngle: 0,
                endAngle: 275,
                offsetX: 0,
                offsetY: 0,
                hollow: {
                  margin: 5,
                  size: "50%",
                  background: "transparent",
                  image: undefined,
                  imageWidth: 150,
                  imageHeight: 150,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  imageClipped: true,
                  position: "front",
                  dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 3,
                    opacity: 0.5
                  }
                },
                track: {
                  show: true,
                  startAngle: undefined,
                  endAngle: undefined,
                  background: "#f2f2f2",
                  strokeWidth: "97%",
                  opacity: 1,
                  margin: 5,
                  dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 3,
                    opacity: 0.5
                  }
                },
                dataLabels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: "22px",
                    fontFamily: undefined,
                    color: undefined,
                    offsetY: -10
                  },
                  value: {
                    show: true,
                    fontSize: "16px",
                    fontFamily: undefined,
                    color: undefined,
                    offsetY: 16,
                    formatter: function(val) {
                      return val + "%";
                    }
                  },
                  total: {
                    show: true,
                    label: "Total",
                    color: "#373d3f",
                    formatter: function(w) {
                      return (
                        w.globals.seriesTotals.reduce((a, b) => {
                          return a + b;
                        }, 0) /
                          w.globals.series.length +
                        "%"
                      );
                    }
                  }
                }
              }
            }
               
                          

        }}
        >
        </Chart>
    </div>
  )
}

export default RadialBarChart