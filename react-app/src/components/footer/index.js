import React from 'react';
import './footer.css'

function Footer() {
    return (
        <div className="footer-container">

            <div className="footer-tex-img">   
                    <div className="img-container">
                        <div className="imgClass"><img className="footer-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/html-circle.png" alt="" /></div>
                        <div className="imgClass"><img className="footer-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/css.png" alt=""></img></div>
                        <div className="imgClass"><img className="footer-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/js.png" alt=""></img></div>
                        <div className="imgClass"><img className="footer-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/react.png" alt=""></img></div>
                        <div className="imgClass"><img className="footer-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/redux.png" alt=""></img></div>
                        <div className="imgClass"><img className="footer-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/Python-Symbol.png" alt=""></img></div>
                        <div className="imgClass"><img className="footer-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/postgress-circle.png" alt=""></img></div>
                        <div className="imgClass"><img className="footer-img" src="https://myaaprojects.s3.us-east-2.amazonaws.com/flask.png" alt=""></img></div>
                    </div>
                    <div className="footer-text"><span className="footer-text-p">Designed and developed by</span>
                                <span className="footer-text-p" style={{color:"white"}}>Brian</span>
                                <span><i class="fa-brands fa-linkedin" style={{color:"white"}}></i></span>
                                <i class="fa-brands fa-github"style={{color:"white"}}></i>
                                <span className="footer-text-p" style={{color:"white"}}>|</span>
                                <span className="footer-text-p" style={{color:"white"}}>Charles</span>
                                <span><i class="fa-brands fa-linkedin" style={{color:"white"}}></i></span>
                                <i class="fa-brands fa-github"style={{color:"white"}}></i>
                                <span className="footer-text-p" style={{color:"white"}}>|</span>
                                <span className="footer-text-p" style={{color:"white"}}>Giovany</span>
                                <span><i class="fa-brands fa-linkedin" style={{color:"white"}}></i></span>
                                <i class="fa-brands fa-github"style={{color:"white"}}></i>
                                <span className="footer-text-p" style={{color:"white"}}>|</span>
                                <span className="footer-text-p" style={{color:"white"}}>Marcos</span>
                                <span><i class="fa-brands fa-linkedin" style={{color:"white"}}></i></span>
                                <i class="fa-brands fa-github"style={{color:"white"}}></i>
                    </div>
            </div>    
        </div>
    )
}

export default Footer