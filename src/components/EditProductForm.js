import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import axios from "axios";

function EditProductForm({id}) {    //รับidมา
    const initProductState = {
        name: "",
        category: "",
        price: "",
        tags: [],
    };

    const [product, setProduct] = useState(initProductState);
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:5000/api/products/" +id).then((response)=>{
            setProduct(response.data)
        });
    },[id])

    const handleInputChange = (event) => {  // ประกาศฟังก์ชัน ส่งeventเข้าไปเป็นพารามิเตอร์
        let { name, value } = event.target;    // เก็บชื่อ กับ value
        if (name === "tags") {   // name เท่ากับ tags มั้ย
            value = value.split(",");   // ต้องsplit valueออกก่อน รับค่าจากstringเป็นแอเรย์
        }
        setProduct({...product, [name]: value}); // เซ็ตProduct เก็บค่า   // ...ถูกโคลนมา 
    };

    // ส่งไปยังหลังบ้าน
    const saveProduct = () => {
        const param = {
            name: product.name,
            category: product.category,
            price: product.price,
            tags: product.tags,
        };
        // เรียกใช้ api
        axios
            .put("http://localhost:5000/api/products/"+ product._id, param) //ส่งพาร์ท และส่งพารามิเตอร์ไปด้วย
            .then((response) => {
                console.log(response.data);
                setProduct({ ...product, param });
                setSubmitted(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const newProduct = () => {
        setSubmitted(false);
    };

    return (
        <Container>
            <Row>
                <h3>Update Product Information</h3>
            </Row>

            {/* เป็นจริงโชว์ตัวหน้า เป็นเท็จโชว์ตัวหลัง */}
            {submitted ? (
                <>
                    <Alert color="succes">You have update successfully !!</Alert>
                    <Button className="btn btn-success" onClick={newProduct}>OK</Button>
                </>
            ) : (
                <>
                    <Form>
                        <FormGroup>
                            <Label for="productName">Product Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="productName"
                                value={product.name || ""}  //ไม่ถูกเซ็ตให้เป็นค่าว่าง
                                onChange={handleInputChange}  //เมื่อมีการเปลี่ยนเเปลงในฟอร์มให้มีการอัพเดต
                                placeholder="Enter Product Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="productCategory">Product Category</Label>
                            <Input
                                type="text"
                                name="category"
                                id="productCategory"
                                value={product.category || ""}
                                onChange={handleInputChange}
                                placeholder="Enter Product Category"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="productPrice">Product Price</Label>
                            <Input
                                type="text"
                                name="price"
                                id="productPrice"
                                value={product.price || ""}
                                onChange={handleInputChange}
                                placeholder="Enter Product Price"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="productTags">Product Tags</Label>
                            <Input
                                type="text"
                                name="tags"
                                id="productTags"
                                value={product.tags || ""}
                                onChange={handleInputChange}
                                placeholder="Enter Product Tags"
                            />
                        </FormGroup>
                        <Button className="btn btn-success" onClick={saveProduct}>Update Product</Button>
                    </Form >
                </>
            )}
        </Container >
    );
}

export default EditProductForm
