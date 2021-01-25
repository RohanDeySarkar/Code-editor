import React from 'react';
import './FileRow.css';

import DescriptionIcon from '@material-ui/icons/Description';

function FileRow({fileName, fileUrl}) {
    const selectFile = () => {
        // fetch(fileUrl)
        // .then((res) => {
        //     res.text()
        //     .then((text) => {
        //         console.log(text);
        //     })
        // })
    };

    console.log(fileUrl);

    return (
        <div className="fileRow" onClick={selectFile}>
            <DescriptionIcon fontSize="small" />
            <p>{fileName}</p>
        </div>
    )
}

export default FileRow
