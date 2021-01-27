import React, {forwardRef } from 'react';
import './FileRow.css';

import DescriptionIcon from '@material-ui/icons/Description';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import {db, firebaseApp} from '../firebase';

import {useStateValue} from './StateProvider';

import Tooltip from '@material-ui/core/Tooltip';

import axios from 'axios';

const FileRow = forwardRef(({id, fileName, fileUrl, setProgress}, ref) => {

    const [{user, selectedId}, dispatch] = useStateValue();

    const selectFile = () => {
        // console.log(fileUrl);
        setProgress(true)

        dispatch(
            {
                type: "EDITOR_TEXT",
                payload: fileUrl
            }
        )

        dispatch(
            {
               type: "SELECTED_FILE",
               payload: id
            }
        )
        setProgress(false)
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

        if (id === selectedId) {
            dispatch(
                {
                   type: "EDITOR_TEXT",
                   payload: null
                }
            )
        }
    };

    return (
        <div
            ref={ref}  
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
});

export default FileRow;