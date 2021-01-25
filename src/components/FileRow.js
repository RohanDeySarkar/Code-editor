import React from 'react';
import './FileRow.css';

import DescriptionIcon from '@material-ui/icons/Description';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {db, firebaseApp} from '../firebase';

import {useStateValue} from './StateProvider';

import Tooltip from '@material-ui/core/Tooltip';

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
        // Delete from database
        db
        .collection("users")
        .doc(user.email)
        .collection("files")
        .doc(id)
        .delete()

        // Delete from storage
        firebaseApp
        .storage()
        .ref()
        .child(fileName)
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
            
            <Tooltip title="Delete" arrow>
                <HighlightOffIcon onClick={handleDelete} />
            </Tooltip>
        </div>
    )
}

export default FileRow
