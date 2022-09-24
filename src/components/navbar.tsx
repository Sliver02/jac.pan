import { useContext, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';

import media from '@assets/styles/mediaQueries';
import { color } from '@assets/styles/variables';
import GlobalContext from '@utils/globalContext';
import { createPanelsRefs } from '@utils/utility';

const Wrap = styled.div`
    flex-wrap: wrap;
    display: flex;
    position: relative;
    width: 100%;
    background: ${color.dark_trasparent};
    justify-content: space-between;
`;

const LogoImage = styled.span``;

const Logo = styled.a`
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 2rem;
    font-size: 1.4rem;

    ${LogoImage} {
        position: relative;
        width: 3rem;
        margin-right: 0.8rem;
        transition: transform 0.2s ease-out;
    }

    &:hover {
        ${LogoImage} {
            transform: rotate(-10deg);
        }
    }
`;

const Burger = styled.div`
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.6rem 1.5rem;
    transition: transform 0.5s, background-color 0.2s;

    &:active,
    &:focus,
    &:hover {
        background: ${color.black_trasparent};
    }

    ${media.min.md`
        display: none !important;
        padding: 1rem 1.5rem;
    `}

    .material-icons {
        font-size: 3rem;
    }
`;

const Menu = styled.div`
    display: flex;

    ${media.max.md`
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;

        top: 0;
        width: 100%;
        height: 100vh;
        background: ${color.black_trasparent};
        font-size: 1.2rem;

        transform: translatex(100vw);
        opacity: 0;
        transition: opacity 0.5s, transform 0.8s;

        ${(props) =>
            !!props.showMenu &&
            css`
                transform: translateY(0);
                opacity: 1;
            `}
    `}
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;

    ${media.max.md`
        flex-direction: column;
    `}
`;

const ButtonText = styled.span`
    transition: transform 0.2s ease-out;
`;

const NavButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    width: 100%;
    height: 100%;
    padding: 1rem 1.5rem;

    transition: padding 0.3s ease-out;

    ${media.max.md`
        margin: 0.5rem 0;
        border: 1px solid ${color.light};
        padding: 1rem 2rem;

        ${(props) =>
            !!props.active &&
            css`
                color: ${color.dark};
                background: ${color.light};
            `}
    `}

    &:hover, 
    &:active, 
    &:focus {
        ${media.max.md`
            color: ${color.dark};
            background: ${color.light};
        `}

        ${media.min.md`            
            ${ButtonText} {
                transform: scale(1.1);
            }
        `}
    }

    &:after {
        ${media.min.md`
            display: block;
            content: '';

            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 2;

            width: 100%;
            height: 0;

            background: ${color.light};
        `}
    }

    ${(props) =>
        !!props.active &&
        css`
            ${media.min.md`
                padding: 0 2rem;
                color: ${color.white};
                background: ${color.light_trasparent};

                &::after {
                    height: 2px;
                }
            `}
        `}
`;

const StyledNavbar = styled.div`
    z-index: 3;
    position: fixed;
    width: 100%;
`;

const Navbar = ({ on_click }) => {
    const { panelIndex, pages, showMenu, setShowMenu, setShowProject } = useContext(GlobalContext);
    const navButtonsRef = useRef([]);

    const handleClick = (index) => {
        on_click(index);
    };

    const toggleMenu = () => {
        setShowProject(false);
        setShowMenu(!showMenu);
    };

    return (
        <StyledNavbar>
            <Wrap>
                <Logo href="." alt="homepage">
                    <LogoImage>
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={50}
                            height={30}
                            layout="responsive"
                        />
                    </LogoImage>
                    <h1>jac.pan</h1>
                </Logo>

                <Burger onClick={() => toggleMenu()}>
                    <i className="material-icons">menu</i>
                </Burger>

                <Menu showMenu={showMenu}>
                    <Nav>
                        {pages.map((page, index) => (
                            <NavButton
                                ref={(e) => createPanelsRefs(navButtonsRef, e, index)}
                                key={index}
                                active={panelIndex === index}
                                onClick={() => panelIndex != index && handleClick(index)}
                            >
                                <ButtonText>.{page}</ButtonText>
                            </NavButton>
                        ))}
                    </Nav>
                </Menu>
            </Wrap>
        </StyledNavbar>
    );
};

export default Navbar;
