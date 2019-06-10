import React, { Component } from 'react';
import leftCorner from '../../images/left-corner-1400.png';
import rightCorner from '../../images/right-corner-1400.png';
import companyLogo from '../../images/logo-iocs-1400.png';
import gameName from '../../images/game-name-1400.png';
import './styles.scss';

class Menu extends Component {
    state = {
        pressed: false,
    };

    // componentDidMount() {
    //     window.addEventListener("resize", this.back);
    //     this.back()
    // }

    // back = () => {
    //     console.log(window.innerWidth);
    //     console.log(window.innerHeight);
    //     if (window.innerWidth >= window.innerHeight) {
    //         this.setState({ back: backgroundHori });
    //     } else {
    //         this.setState({ back: background });
    //     }
    // }

    clickHandle = () => {
        const { pressed } = this.state;
        const { start } = this.props;
        this.setState({ pressed: !pressed });
        start();
    }

    render() {
        const { pressed } = this.state;

        return (
            <div>
                <div className="MenuColor">
                    <div className="MenuCorner">
                        <img src={rightCorner} className="RightCorner" />
                        <img src={leftCorner} className="LeftCorner"  />
                        <div className="MenuIcons" />
                    </div>
                </div>
                <div>
                    <div className="glass" />{/* position absolute both */}
                    <div className="content">
                        <div className="col-12">
                            <img src={companyLogo} className="logo" />
                        </div>
                        <div className="col-12">
                            <img src={gameName} className="title" />
                            <div onClick={this.clickHandle} className="startButton" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Menu;
