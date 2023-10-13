import React from "react";
import './MuiBoxContainer.css';
export default function MuiBoxContainer(){
    return(
        <>
            <div className="mb-container">
                <div className="col-1">
                    <div className="col-sub">
                        <p className="a">Build by developers</p>
                        <h2 className="b">Soft UI Dashboard</h2>
                        <p><span className="c">From colors, cards, typography to <br/>
                            complex elements, you will find the <br/>
                            full documentation.</span></p>
                        <p className="d">Read more</p>
                    </div>
                    <div>
                        <img src="https://media.istockphoto.com/id/1168725582/vi/vec-to/ph%C3%B3ng-t%C3%AAn-l%E1%BB%ADa-kh%C3%B4ng-gian-m%C3%A0u-xanh-v%E1%BB%9Bi-m%E1%BB%99t-l%E1%BB%97-c%E1%BB%95ng-phim-ho%E1%BA%A1t-h%C3%ACnh-v%C3%A0-phong-c%C3%A1ch-ph%E1%BA%B3ng-h%C3%ACnh.jpg?s=170667a&w=0&k=20&c=NMN1-9lQrDLw1eSp5Kt9D3dbJ7bOv4bkaWYXa3ZmD9k=" alt="" />
                    </div>
                </div>
                <div className="col-2">
                    <h2 className="e">Work with the rockets</h2>
                    <p className="f">Wealth creation is an evolutionarily recent<br/>
                         positive-sum game.It is all about<br/>
                          who take the opportunity first.</p>
                    <p className="d">Read more</p>
                </div>
            </div>
        </>
    )
}