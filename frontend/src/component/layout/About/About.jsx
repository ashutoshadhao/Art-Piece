import React from "react";
import aboutImage from "../../../images/aboutPageImage.jpg";
const About = () => {
  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="container">
              <div className="row">
                <div
                  className="col  align-items-center justify-content-center flex-column"
                  style={{
                    textAlign: "center",
                    margin: "0px",
                  }}
                >
                  <h1 style={{
                      marginTop: "100px",
                      fontSize:"50px"
                    }} > ABOUT US </h1>
                  <div
                    style={{
                      margin: "29px",
                      fontSize:"20px"
                    }}
                  >
                    <p>
                      <br />
                      <p>
                      Welcome to our art ecommerce website! We are a team of passionate art enthusiasts who believe in the transformative power of art. Our mission is to bring the beauty of art to people's lives by providing a platform for talented artists to showcase their work and connect with art lovers around the world.
                      </p>
                      <br />
                      
                    </p>
                  </div>
                </div>
                <div className="col">
                  <img
                    src={aboutImage}
                    alt="AboutImage"
                    width={"500px"}
                    height={"500px"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
