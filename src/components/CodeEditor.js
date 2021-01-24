import React, { useEffect, useState } from 'react';
import './CodeEditor.css';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';

import MonacoEditor from 'react-monaco-editor';
import Editor from "@monaco-editor/react";

import {v4 as uuid} from 'uuid';

import {storage, db} from '../firebase';
import firebase from 'firebase';

function CodeEditor() {
    // const [selectedFile, setSelectedFile] = useState(null);
    const [checked, setChecked] = useState(false);
    const [files, setFiles] = useState(["file1.txt", "file1.txt", "file1.txt", "file1.txt"]);

    useEffect(() => {

    }, []);

    const handleEditorChange = (value, event)  => {
        console.log("Your CODE-->", value);
    };

    const onChange = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const text = (e.target.result)
            console.log(text)
        };

        console.log(reader)

        // db
        // .collection("files")
        // .add(
        //     {
        //         data: reader.readAsText(e.target.files[0]),
        //         timestamp: firebase.firestore.FieldValue.serverTimestamp(), 
        //     }
        // )
    };

    const uploadFile = () => {
    };

    // console.log(selectedFile);

    return (
        <div className="codeEditor">
            <div className="codeEditor__header">
                <div className="codeEditor__headerLeft">
                    <Avatar />
                    {/* Add logout on avatr click */}
                </div>

                <div className="codeEditor__headerRight">
                    <input 
                        type="file"
                        onChange={onChange}
                    />

                    <Button onClick={uploadFile}>
                        Open in workspace
                    </Button>

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

                    <div>
                        {files.map((file => (
                            <div className="codeEditor__file">
                                <p>{file}</p>
                            </div>
                        )))}
                    </div>
                </div>

                <div className="codeEditor__bodyRight">
                    <Editor
                        height="80vh"
                        theme={checked? "vs-dark" : ""}
                        // path="script.js"
                        defaultLanguage="javascript"
                        defaultValue="// Code here"
                        onChange={handleEditorChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeEditor