import { useState } from 'react'
import './Uploader.css'
import axios from 'axios';
import { MdCloudUpload, MdDelete } from "react-icons/md";
import {AiFillFileImage} from 'react-icons/ai'


function Dada() {
    const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
    const [ image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No file selected")
    
    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', file);
    
        const response = await axios.post('/api/upload', formData, {
          onUploadProgress: (event) => {
            const progress = (event.loaded / event.total) * 100;
            setProgress(progress);
          },
        });
    
        // Handle the response and update the UI to display the link to the uploaded image
        const link = response.data.link;
        // ...
      };
    
      const renderProgressBar = () => {
        return (
          <div>
            <progress value={progress} max="100" />
          </div>
        );
      };

    return(
        <main>
            <form
            onClick={() => document.querySelector("input").click()}
            >
                <input multiple type="file" accept="image/*" hidden
                onChange={({target: {files}})=>{
                    files[0] && setFileName(files[0].name)
                    if (files) {
                        setImage(URL.createObjectURL(files[0]))
                    }
                }}
                />
            
            
            {image ?
            <img src={image} width={160} height={160} alt={fileName} />
            :
            <>
            <MdCloudUpload color='#F9B021' size={60} height={60}/>
            <p>Browse files to upload</p>
            </>
            }
            </form>
            <section className='uploaded-row'>
              <AiFillFileImage color='#F9B021'/>
              <span className='upload-conten'>
                {fileName} -
                <MdDelete
                onClick={()=>{
                    setFileName("No selected file")
                    setImage(null)
                }}
                />
                </span>  
            </section>
            <button onClick={uploadImage}>Upload</button>
            {renderProgressBar()}

        </main>
    )
    
}
export default Dada