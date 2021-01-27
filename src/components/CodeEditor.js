import React, { useEffect, useState } from 'react';
import './CodeEditor.css';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

import Editor from "@monaco-editor/react";

import {db, firebaseApp} from '../firebase';
import firebase from 'firebase';

import {useStateValue} from './StateProvider';

import FileRow from './FileRow';
import Footer from './Footer';

import axios from 'axios';

function CodeEditor() {

    const [{user, defaultText, selectedId}, dispatch] = useStateValue();

    const [file, setFile] = useState(null);
    const [checked, setChecked] = useState(false);
    const [progress, setProgress] = useState(false);
    const [myFiles, setMyFiles] = useState([]);

    useEffect(() => {
        setProgress(true);

        db
        .collection("users")
        .doc(user.email)
        .collection("files")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => 
            setMyFiles(
                snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                ))
            )
        );

        setProgress(false);
    }, [file]);

    // console.log(myFiles)

    const handleEditorChange = (value, event)  => {
        // console.log("Your CODE-->", value);

        dispatch(
            {
                type: "EDITOR_TEXT",
                payload: value
            }
        );

        db
        .collection("users")
        .doc(user.email)
        .collection("files")
        .doc(selectedId)
        .set(
            {
                fileUrl: value,
            },
            {merge: true}
        );

    };

    const onChange = (e) => {
        setFile(e.target.files[0]);
    };

    const addFile = () => {
        if (file) {
            setProgress(true);
            const storageRef = firebaseApp.storage().ref()
            const fileRef = storageRef.child(file.name)

            fileRef
            .put(file)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();  
            })
            .then(downloadURL => {
                // console.log(downloadURL)

                axios
                .get(`https://cors-anywhere.herokuapp.com/${downloadURL}`)
                .then((res) => res.data)
                .then((data) => {
                    db
                    .collection("users")
                    .doc(user.email)
                    .collection("files")
                    .add(
                        {
                            fileName: file.name,
                            fileUrl: data,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        }
                    )
                });
            })
            .catch(err => {
                console.log(err);
            });
            setProgress(false);
        } else {
            alert("Choose a file for upload!")
        }
    };

    
    const logOut = () => {
        dispatch(
            {
                type: 'SET_USER',
                payload: null
            }
        )
    };

    console.log(defaultText);

    return (
        <div className="codeEditor">
            <div className="codeEditor__header">
                <div className="codeEditor__headerLeft">
                <Tooltip title="Sign out">
                    <Avatar
                        className="codeEditor__avatar"
                        src={user.photo}
                        alt=""
                        onClick={logOut} 
                    />
                </Tooltip>

                    <h3>{user.displayName}</h3>
                </div>

                <div className="codeEditor__headerMiddle">
                    <input 
                        type="file"
                        onChange={onChange}
                    />

                    <Button onClick={addFile}>
                        Open in workspace
                    </Button>
                </div>

                <div className="codeEditor__headerRight">
                    <img 
                        className="toggle__icon" 
                        style={{backgroundColor: 'skyblue'}}
                        src="https://image.flaticon.com/icons/svg/1164/1164954.svg"
                        alt="" 
                    />
                    <Switch
                        checked={checked}
                        onChange={() => setChecked((prev) => !prev)}
                        color="primary"
                    />
                    <img
                        className="toggle__icon" 
                        src="https://image.flaticon.com/icons/svg/2033/2033921.svg" 
                        alt="" 
                    />
                </div>
            </div>

            <div className="codeEditor__body">
                <div className={`codeEditor__bodyLeft ${checked && 'codeEditor__bodyLeft--dark'}`}>
                    <h3>Your Files</h3>

                    <div className='codeEditor__files'>
                        {progress? 
                            <CircularProgress /> 
                            :
                            myFiles.map(({id, data: {fileName, fileUrl}}) => 
                                <FileRow
                                    key={id}
                                    id={id} 
                                    fileName={fileName}
                                    fileUrl={fileUrl}
                                    setProgress={setProgress}
                                />
                            ) 
                        }
                    </div>
                </div>
                
                <div className="codeEditor__bodyRight">
                    {progress? 
                        <CircularProgress /> 
                        : 
                        <Editor
                        height="80vh"
                        theme={checked? "vs-dark" : ""}
                        // path="script.js"
                        defaultLanguage="javascript"
                        // defaultValue={defaultText}
                        value={defaultText}
                        onChange={handleEditorChange}
                        />
                    }
                    
                </div>
            </div>

            <div className="codeEditor__footer">
                    <Footer />
            </div>
        </div>
    )
}

export default CodeEditor
