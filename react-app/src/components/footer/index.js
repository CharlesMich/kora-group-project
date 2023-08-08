import React from 'react';
import {Link} from 'react-router-dom'
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
                                <Link to={{ pathname: "https://www.linkedin.com/in/bson18/" }} target="_blank"><span><i class="fa-brands fa-linkedin" style={{color:"white"}}></i></span></Link>
                                <Link to={{ pathname: "https://github.com/bson18" }} target="_blank"><i class="fa-brands fa-github"style={{color:"white"}}></i></Link>
                                <span className="footer-text-p" style={{color:"white"}}>|</span>
                                <span className="footer-text-p" style={{color:"white"}}>Charles</span>
                                <Link to={{ pathname: "https://www.linkedin.com/in/charles-michael-b83571a2/" }} target="_blank"><span><i class="fa-brands fa-linkedin" style={{color:"white"}}></i></span></Link>
                                <Link to={{ pathname: "https://github.com/CharlesMich" }} target="_blank"><i class="fa-brands fa-github"style={{color:"white"}}></i></Link>
                                <span className="footer-text-p" style={{color:"white"}}>|</span>
                                <span className="footer-text-p" style={{color:"white"}}>Giovany</span>
                                <Link to={{ pathname: "https://www.linkedin.com/in/giovany-victor-33226a266/" }} target="_blank"><span><i class="fa-brands fa-linkedin" style={{color:"white"}}></i></span></Link>
                                <Link to={{ pathname: "https://github.com/giovanyv02" }} target="_blank"><i class="fa-brands fa-github"style={{color:"white"}}></i></Link>
                                <span className="footer-text-p" style={{color:"white"}}>|</span>
                                <span className="footer-text-p" style={{color:"white"}}>Marcos</span>
                                <Link to={{ pathname: "https://www.linkedin.com/in/marcos-d-del-valle-46a590239/" }} target="_blank"><span><i class="fa-brands fa-linkedin" style={{color:"white"}}></i></span></Link>
                                <Link to={{ pathname: "https://github.com/MarcosD00" }} target="_blank"><i class="fa-brands fa-github"style={{color:"white"}}></i></Link>
                    </div>
            </div>    
        </div>
    )
}

export default Footer