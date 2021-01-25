import React from 'react';
import './FileRow.css';

import DescriptionIcon from '@material-ui/icons/Description';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {db} from '../firebase';

import {useStateValue} from './StateProvider';

function FileRow({id, fileName, fileUrl}) {

    const [{user, selectedId}, dispatch] = useStateValue();

    const selectFile = () => {
        console.log(fileUrl);

        // fetch(fileUrl)
        // .then((res) => {
        //     res.text()
        //     .then((text) => {
        //         console.log(text);
        //     })
        // })

        dispatch(
            {
               type: "SELECTED_FILE",
               payload: id
            }
        )
    };

    const handleDelete = () => {
        db
        .collection("users")
        .doc(user.email)
        .collection("files")
        .doc(id)
        .delete()
    };

    return (
        <div 
            className={`fileRow ${selectedId === id ? "fileRow--selected" : ""}`} 
            onClick={selectFile}
        >
            <div className="fileRow__file">
                <DescriptionIcon fontSize="small" />
                <p>{fileName}</p>
            </div>

            <HighlightOffIcon onClick={handleDelete} />
        </div>
    )
}

export default FileRow
