import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 993 })
  return isDesktop ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 992 })
  return isMobile ? children : null
}
const divStyle = {
  display: 'flex',
  flexWrap: "wrap",
  color: 'white'
};

class AboutPage extends Component {
  render() {
    let cols = ["topCol", "bottomLeftCol", "bottomRightCol"];
    let text = ["Due to the social distancing we are all facing and not being able to see our friends as often, " +
    "we have created a movie suggestion board that can be used by a group of friends to suggest movie ideas and upvote " + 
    "these ideas. Our goal of this project is to allow people to still maintain some social interaction while still " +
    "allowing social distancing to help reduce group gatherings.", 
    "How to login: If you are a first time user, you can set up an account by clicking the “sign up” button in the top " +
    "right corner of the screen. You can then input your email and password to create an account and login with those credentials!", 
    "You can search for movies on the home page after signing in! Typing in a movie " +
    "title will then add the movie to the dashboard where you will have the opportunity to upvote."];
    return (
    <Container fluid>
      <h1 id = "aboutHeading">What is this all about?</h1>
      <DesktopRows content={text} cols={cols}/>
      <MobileRows content={text} cols={cols}/>
    </Container> 
    );
  }
}

class DesktopRows extends Component {
  render() {
    return (
    <Desktop>
      <Row>
        <Col id = {this.props.cols[0]}>
          <img src="catsWatchingMovie.png" id = "catPic" alt="Cats watching a movie together" />
          <div id="text">
           {this.props.content[0]}
          </div>
        </Col>
      </Row>
      <Row>
        <Col id = {this.props.cols[1]}>
          <div style={divStyle}>
            <h3 id="loginHeading">How to sign up</h3>
          </div>
          <img src="signupPicture.png" id = "signupPic" alt="Login form" />
          <div id="text">
            {this.props.content[1]}
          </div>
        </Col>         
        <Col id = {this.props.cols[2]}>
          <div style={divStyle}>
            <h3 id="useHeading">How to use</h3> 
          </div>
          <img src="suggestionPicture.png" id = "signupPic" alt="Login form" />
          <div id="text">
            {this.props.content[2]}
          </div>
        </Col> 
      </Row>
    </Desktop>
    )
  }
}

class MobileRows extends Component {
  render() {
    return (
    <Mobile>
      <Row>
        <Col id = {this.props.cols[0]}>
          <div id="text">
            {this.props.content[0]}
          </div>
        </Col> 
      </Row>
      <Row>
        <Col id = {this.props.cols[1]}>
          <div style={divStyle}>
            <h3 id="loginHeading">How to sign up</h3>
          </div>
          <div id="text">
            {this.props.content[1]}
          </div>
        </Col> 
      </Row>
      <Row>
        <Col id = {this.props.cols[2]}>
          <div style={divStyle}>
            <h3 id="useHeading">How to use</h3> 
          </div>
          <div id="text">
            {this.props.content[2]}
          </div>
        </Col> 
      </Row>
    </Mobile>
    )
  }
}


export default AboutPage;

