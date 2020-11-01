import React from 'react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';



class HideOnScroll extends React.Component {

    constructor(props) {
        super(props);
    }
    trigger2 = () => {
        useScrollTrigger({ target: this.props.window ? window() : undefined });
    }

    render() {
        const { children } = this.props;
        return (
            <Slide appear={false} direction="down" in={!this.trigger2}>
                {children}
            </Slide>
        );
    }
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};
export default HideOnScroll;