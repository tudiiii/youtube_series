import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzon from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value : 0, label : "Private"},
    {value : 1, label : "Public"}
]

const CategoryOptions = [
    { vlaue : 0, label : "File & Animation"},
    { value : 1, label : "Autos & Vehicles"},
    { value : 2, label : "Music"},
    { value : 3, label : "Pets & Animals"}
]


function VideoUploadPage() {


    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDscription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("File & Animation")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }
    
    const onDescriptionChange = (e) => {
        setDscription(e.currentTarget.value)
    }    

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }    

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {

        let formData = new FormData;
        const config = {
            header : {'content-type' : 'multipart/form-data'}
        }
        formData.append("file", files[0]);

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success){
                    console.log("response.data " + JSON.stringify(response.data ));

                    let variable = {
                        url : response.data.url,
                        fileName : response.data.fileName
                    }


                    console.log("variable===" + JSON.stringify(variable));

                    Axios.post('/api/video/thumbnail', variable)
                    .then(response => {
                        if(response.data.success) {
                            console.log(response.data);
                        }else {
                            alert('????????? ????????? ??????????????????.')
                        }
                    })
                }else {
                    alert('????????? ???????????? ??????????????????.')
                }
            })
    }
 
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center' , marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{ disaply:'flex', justifyContent:'space-between'}} >
                    {/* Drop zone */}
                        <Dropzon
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={10000000}
                        >

                        {({ getRootProps, getInputProps}) => (
                            <div style={{ width : '300px', height : '240px', border : '1px solid lightgray',
                            alignItems:'center', justifyContent : 'center'}} { ...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize:'3rem'}} />
                            </div>
                        )}
                        </Dropzon>
                        

                    {/* Thumbnail */}
                    <div>
                        <img src alt />
                    </div>
                </div>

                <br />
                <br />
                
                <lable>Title</lable>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />

                <label>Description</label>
                <TextArea 
                    onChange={onDescriptionChange}
                    value={Description}
                />
                
                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br />
                <br />

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                
                <br />
                <br />

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage