/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { QUERIES, COLORS, WEIGHTS } from "../../constants";
import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Wrapper>
      <Overlay isOpen={isOpen} onDismiss={onDismiss}>
        <Content aria-label="menu">
          <CloseButton onClick={onDismiss}>
            <VisuallyHidden>Dismiss menu</VisuallyHidden>
            <Icon id="close" strokeWidth={1} />
          </CloseButton>
          <Nav>
            <NavLink href="/sale">Sale</NavLink>
            <NavLink href="/new">New&nbsp;Releases</NavLink>
            <NavLink href="/men">Men</NavLink>
            <NavLink href="/women">Women</NavLink>
            <NavLink href="/kids">Kids</NavLink>
            <NavLink href="/collections">Collections</NavLink>
          </Nav>
          <Footer>
            <FooterLink href="/terms">Terms and Conditions</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </Footer>
        </Content>
      </Overlay>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsl(220deg 5% 40% / 0.8);
  display: flex;
  justify-content: flex-end;
`;
const Content = styled(DialogContent)`
  background: white;
  position: relative;
  flex: 0 1 300px;
  padding: 32px;
  display: flex;

  flex-direction: column;
  justify-content: space-between;
`;

const CloseButton = styled(UnstyledButton)`
  align-self: flex-end;
  padding: 16px;
  position: relative;
  top: -22px;
  right: -32px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;
  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const FooterLink = styled.a`
  color: ${COLORS.gray[700]};
  text-decoration: none;
  font-size: 0.875rem;
`;
export default MobileMenu;
