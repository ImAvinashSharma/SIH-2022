import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

function Slider({images}) {
  return (
    <div className='bg-red-200'>
        <div className='hidden md:block'>
            <SimpleImageSlider
                autoPlay={true}
                width={400}
                height={300}
                images={images}
                showBullets={true}
                showNavs={true}
            />
        </div>
        <div className='hidden sm:block md:hidden'>
            <SimpleImageSlider
                autoPlay={true}

                    width={448}
                    height={252}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                />
        </div>
        <div className='block sm:hidden'>
            <SimpleImageSlider
                autoPlay={true}

                    width={298}
                    height={168}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                />
        </div>
    </div>
  )
}

export default Slider