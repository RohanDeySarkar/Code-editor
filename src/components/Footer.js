import React from 'react';
import './Footer.css';

import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';

import { saveAs } from 'file-saver';

import {useStateValue} from './StateProvider';

function Footer() {

    const [{defaultText}, dispatch] = useStateValue();

    const startDownload = () => {
        const name = prompt('Enter File Name');
        if (name) {
            var file = new File([defaultText], `${name}.js`, {type: "javascript;charset=utf-16"});
            saveAs(file)
        }
    };

    return (
        <Button 
            className="footer__button"
            startIcon={<GetAppIcon />}
            onClick={startDownload}
        >
            Download
        </Button>
    )
}

export default Footer
