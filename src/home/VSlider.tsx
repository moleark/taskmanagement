import React from 'react';
import { View } from 'tonva';
import { CHome } from './CHome';
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/*const sliderSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    isArrows: true,
    isDots: true
};
*/

export class VSlider extends View<CHome> {
    public render(param: any) {
        let { banners, cApp } = this.controller;
        let { showPostDetail } = cApp.cPost

        if (banners.length > 0) {

            let random = Math.floor(Math.random() * 10 % banners.length);
            let url = banners[random].src
            let index = url.lastIndexOf("/");
            let str = url.substring(index + 1, url.length);

            return (
                <div className="cursor-pointer" style={{ position: "relative" }} onClick={() => showPostDetail({ id: str })}>
                    <img src={banners[random].path} className="d-block w-100" alt="..." />
                    <div className="" style={{ position: 'absolute', left: '35%', top: '55%', transform: 'translate(-50%, -50%)' }}>
                        <p className="mb-2" style={{ fontSize: '5vw' }} dangerouslySetInnerHTML={{ __html: banners[random].caption }}></p>
                        <p className="mb-2" style={{ fontSize: '4vw' }} dangerouslySetInnerHTML={{ __html: banners[random].description }}></p>
                    </div>
                </div>

            )
        }
    }

    // public render(param: any) {

    //     let { banners } = this.controller;
    //     if (banners.length > 0) {
    //         let random = Math.floor(Math.random() * 10 % banners.length);
    //         return (
    //             <div className="d-flex" style={{ position: "relative" }}>
    //                 <img src={banners[random].path} className="d-block w-100" alt="..." />
    //                 <div className="" style={{ position: 'absolute', left: '40%', top: '45%', transform: 'translate(-50%, -50%)' }}>
    //                     <p className="mb-2  text-white " style={{ fontSize: '1.7rem' }}>{banners[random].caption}</h3>
    //                     <p className="mb-2 text-white" style={{ fontSize: '1rem' }}>{banners[random].description}</p>
    //                 </div>
    //             </div>
    //         )
    //     }
    // }
}
