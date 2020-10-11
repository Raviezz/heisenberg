import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { dashboardStyles } from './index';
import Avatar from '@material-ui/core/Avatar';

import Box from '@material-ui/core/Box';
import personIcon from '../assets/images/business-man.png';


export const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                ravitejab
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const Footer = () => {
    return (
        < footer className={dashboardStyles.footer} >



            <Typography variant="subtitle1" align="center" className={dashboardStyles.wrapIcon}>
                {/*  <Avatar alt="Remy Sharp" align="center" src={personIcon} className={dashboardStyles.avatarIcon} /> */}
                {' RaviTeja '}
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Something here to give the footer a purpose!
      </Typography>
            <Copyright />
        </footer >
    );
}