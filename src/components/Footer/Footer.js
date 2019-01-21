import React from "react";

const Footer = () => {
    return (
        <div className="footer">
            <h1>
                <span className="italic">foster</span>
                <span className="bold">PET</span>
            </h1>
            <div className="socialMedia">
                <a href="http://facebook.com">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/animal-foster-project.appspot.com/o/facebook.png?alt=media&token=f945938d-e15d-49d5-ac52-99e528efb9cd"
                        alt="facebook"
                    />
                </a>
                <a href="http://instagram.com">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/animal-foster-project.appspot.com/o/instagram.png?alt=media&token=87bee3ec-a2ef-4612-9426-f35287a2e436"
                        alt="instagram"
                    />
                </a>

                <a href="http://twitter.com">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/animal-foster-project.appspot.com/o/twitter.png?alt=media&token=af8b786f-a672-421c-bac8-97a143bf8b1d"
                        alt="twitter"
                    />
                </a>
            </div>
        </div>
    );
};

export default Footer;
