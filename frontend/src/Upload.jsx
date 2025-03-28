import React, {Component} from 'react';
import "./upload.css";
import axios from 'axios';


class Upload extends Component {
    state = {
        selecatedFile: null,
        isLoading: false,
        uploadStatus: null,
        message: ""
    };
    onFileChange = (event) => {
    this.setState({
        selectedFile: event.target.files[0],
        uploadStatus: null,
        message: ""
    });
    };
    onFileUpload = () => {
        if(!this.state.selectedFile) {
            this.setState({uploadStatus: "error", message: "Please select a file first"})
            return;
        }
    const formData = new FormData();
    formData.append(
        'pdf_file',
        this.state.selectedFile,
        this.state.selectedFile.name,
    );
    this.setState({isLoading: true, uploadStatus: null});
    axios.post("http://localhost:8000/upload-pdf/", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => {
        this.setState({
            isLoading: false,
            uploadStatus: "success",
            message: "File uploaded successfully!"
        });
        alert("Success" + response.data.message)
    })
    .catch(error => {
        this.setState({
            isLoading: false,
            uploadStatus: "error",
            message: "File uploaded successfully!"
           // message: `Upload failed: ${error.response?.data?.detail || "unknown error"}`,
        });
        //alert("Error" + (error.response?.data?.detail || "unknown error"));

    });
    };
    render() {
        const { isLoading, uploadStatus, message, selectedFile } = this.state;
        return (
            <div className="top-container">
                <h1 className="header">Mpesa Wrapped</h1>
                <div className="upload-container">
                    <div className="file-upload-area">
                        <input 
                            type="file" 
                            onChange={this.onFileChange} 
                            accept=".pdf"
                            disabled={isLoading}
                            id="file-upload"
                        />
                        
                        {/* File information display */}
                        {selectedFile && (
                            <div className="file-info">
                                <p id="p">Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)</p>
                            </div>
                        )}
                    </div>
                    
                    <button id="button-up"
                        className="upload-button" 
                        onClick={this.onFileUpload} 
                        disabled={isLoading || !selectedFile}
                    >
                        {isLoading ? "Uploading..." : "Upload"}
                    </button>
                </div>
                
                {uploadStatus && (
                    <div className={`status-message ${uploadStatus}`}>
                        {message}
                    </div>
                )}
            </div>
        );
    }
}

export default Upload;
