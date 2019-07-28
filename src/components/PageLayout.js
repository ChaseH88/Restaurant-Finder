import React from "react";
import styled from "styled-components";

const Template = styled.div`
  margin: 100px 0 0;
`;

const Header = styled.header`
  background-color: #ffffff;
  padding: 30px 0;
  margin: 0 0 3vw;
  box-shadow: 0 0 4px 0 #9c9c9c;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: auto;
  min-width: 100%;
  z-index: 10000;
`;

const Body = styled.section`

`;

const Footer = styled.footer`
  background-color: #000;
`;

const Container = styled.div`
  max-width: 80vw;
  margin: 0 auto;
`;

const PageLayout = (props) => {
  let { children } = props;
  console.log("Layout")
  console.log(props);
  return(
    <Template>
      <Header>
        <Container>

        </Container>
      </Header>
      <Body>
        <Container>
          {children}
        </Container>
      </Body>
      <Footer>
        <Container>

        </Container>
      </Footer>
    </Template>
  )
}

export default PageLayout;