import axios from "axios";
import React, {useState} from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { 
    Container, 
    Row, 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    Alert,
    FormText,
    Progress,
} from 'reactstrap';

function AddProductForm() {
    const initProductState = {
        name: "",
        category: "",
        price: "",
        tags: [],
        file: "",
    };
    //const [product, setProduct] = useState(initProductState);
    const [submitted, setSubmitted] = useState(false);
    const [progress, setProgress] = useState(0);

    const uploadFileToFirebase = async (file) => {
        //Prepare unique file name
        const userId = "001";
        const timestamp = Math.floor(Date.now() / 1000);    //เวลาปัจจุบัน ปรับทศนิยมลงมาให้ไม่ยาว
        const newName = userId + "_" + timestamp;

        //uploading file
        const storageRef = ref(storage, `images/${newName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        //get URL
        await uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            setProgress(uploadProgress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                saveProduct(downloadURL);
            });
            }
        );
    };

    const FILE_SIZE = 2000 * 1024;
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
    ]

    const formik = useFormik({
        initialValues: initProductState,
        validationSchema: yup.object().shape({
            name : yup.string().required("กรุณากรอกข้อมูล"),
            category : yup.string().required("กรุณากรอกข้อมูล"),
            price : yup.number().positive("ไม่สามารถติดลบได้").required("กรุณากรอกข้อมูล"),
            tags : yup.string(),
            file: yup.mixed().test("fileSize","ไฟล์มีขนาดใหญ่เกินไป", (file)=>{
                if(file){
                    return file?.size <= FILE_SIZE;
                }else{
                    return true;
                }
            })
            .test('fileType',"อัพโหลดได้เฉพาะรูปภาพเท่านั้น", (file)=>{
                if (file) {
                    return SUPPORTED_FORMATS.includes(file?.type);
                }else{
                    return true;
                }
            })
        }),
        onSubmit: () => {
            if (formik.values.file) {
                console.log("Uploading image....")
                uploadFileToFirebase(formik.values.file);   //เพือให้อัพโหลดขึ้นไปบนอินเตอร์เน็ต
            } else {
                saveProduct("");
            }

            //saveProduct();
        }
    });

    /*const handleInputChange = (event) => {
        let {name, value} = event.target;
        if (name === "tags"){
            value = value.split(",");
        }
        setProduct({...product, [name]: value }); //...product คือลูปอันอื่นแล้วโคลนออกมา
    };*/

    const saveProduct = (url) => {
        //prepare parameters
        const param = {
            name: formik.values.name,
            category: formik.values.category,
            price: formik.values.price,
            tags: formik.values.tags,
            imageURL: url,
        };

        axios
            .post("http://localhost:5000/api/products", param)
            .then((response) => {
                console.log(response.data);
                //setProduct(initProductState);
                setSubmitted(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const newProduct = () => {
        //setProduct(initProductState);
        setSubmitted(false);
    };

    return (
        <Container>
            <Row>
                <h3>Add new Product</h3>
            </Row>
            {submitted ? ( //true
                <>
                    <Alert color="success">
                        You have submitted successfully !!
                    </Alert>
                    <Button className="btn btn-success" onClick={newProduct}>Add new Product</Button>
                </>
            ) : ( //false
                <>
                    <Form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <Label for="productName">Product Name</Label>
                            <Input 
                                type="text"
                                name="name"
                                id="productName"
                                value={formik.values.name || ""} //ถ้า State ยังไม่สร้างขึ้น ให้เซ็ตเป็นค่าว่าง
                                onChange={formik.handleChange}
                                placeholder="Enter product name"
                            />

                            {formik.errors.name && formik.touched.name && (
                                <p>{formik.errors.name}</p>
                            )}

                        </FormGroup>
                        <FormGroup>
                            <Label for="productCategory">Product Category</Label>
                            <Input 
                                type="text"
                                name="category"
                                id="productCategory"
                                value={formik.values.category || ""}
                                onChange={formik.handleChange}
                                placeholder="Enter product category"
                            />

                            {formik.errors.category && formik.touched.category && (
                                <p>{formik.errors.category}</p>
                            )}

                        </FormGroup>
                        <FormGroup>
                            <Label for="productPrice">Product Price</Label>
                            <Input 
                                type="text"
                                name="price"
                                id="productPrice"
                                value={formik.values.price || ""}
                                onChange={formik.handleChange}
                                placeholder="Enter product price"
                            />

                            {formik.errors.price && formik.touched.price && (
                                <p>{formik.errors.price}</p>
                            )}

                        </FormGroup>
                        <FormGroup>
                            <Label for="productTags">Product Tags</Label>
                            <Input 
                                type="text"
                                name="tags"
                                id="productTags"
                                value={formik.values.tags || ""}
                                onChange={formik.handleChange}
                                placeholder="Enter product tags"
                            />

                            {formik.errors.tags && formik.touched.tags && (
                                <p>{formik.errors.tags}</p>
                            )}

                        </FormGroup>

                        <FormGroup>
                            <Label for="fileupload">Product Image</Label>
                            <Input 
                                type="file" 
                                name="file" 
                                onChange={(event) =>{
                                    formik.setFieldValue("file",event.currentTarget.files[0]);
                                }} 
                            />
                            <FormText color="muted">
                                รองรับเฉพาะไฟล์ภาพและขนาดต้องไม่เกิน 2 Mb
                            </FormText>
                            {formik.errors.file && formik.touched.file && (
                                <p>{formik.errors.file}</p>
                            )}
                            {progress != 0 && (
                            <Progress value={progress} max ="100" animated>
                                {progress} %
                            </Progress>
                            )}
                        </FormGroup>
                        
                        <Button className="btn btn-success">Add new Product</Button>
                    </Form>
                </>
            )}
            
        </Container>
    );
}

export default AddProductForm;