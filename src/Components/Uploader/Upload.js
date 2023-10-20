import { useState } from 'react'
import './Uploader.css'
import axios from 'axios';
import { MdCloudUpload, MdDelete } from "react-icons/md";
import {AiFillFileImage} from 'react-icons/ai'


function Upload() {
    const [ image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No file selected")
    
    const handleSubmit = async () => {
        if (!image) {
            console.log("No file seleceted")
        }
        const formData = new FormData();
        formData.append('file', image);
    
        const uploadParams = {
          method: 'post',
          url: '/api/upload',
          data: formData,
        };
    
        axios(uploadParams).then((response) => {
          // The file has been uploaded successfully.
        }).catch((error) => {
          // An error occurred while uploading the file.
        });
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
            <img src={image} width={'auto'} height={'100%'} alt={fileName} />
            :
            <>
            <MdCloudUpload color='#F9B021' size={70} height={70}/>
            <p>Browse files to upload</p>
            </>
            }
            </form>
            <section className='uploaded-row'>
              <AiFillFileImage />
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
            <button onClick={handleSubmit}>Upload</button>

        </main>
    )
    
}
export default Upload