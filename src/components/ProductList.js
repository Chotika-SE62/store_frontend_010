import React, { useState, useEffect } from 'react'; //useEffect = เรียก data เข้ามา
import { Table, Container, Row, Button } from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';

function ProductList() {
    const [products, setProducts] = useState([]);
    const updateProduct = () => {
        // ดึงdataทั้งหมดมา
        axios.get("http://localhost:5000/api/products").then((response) => {
            setProducts(response.data);
            console.log("Updating Product list .....")
        });
    };
    useEffect(() => { //รับuseEffectเข้ามา
        updateProduct();
    }, []);      // [] = ทำครั้งเดียว ใส่แอเรย์เปล่าๆไว้
    
    const deleteProduct = (product) => {
        swal({
            title: "Do you want to delete " + product.name + " ?",
            text: "Once deleted, you will not be able to recover this Product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
                axios.delete("http://localhost:5000/api/products/" + product._id).then(
                    (response) => {
                        console.log(response.data);
                        updateProduct(); //รีหน้าเว็บเมื่อกดลบ รายการที่ลบจะหายไป
                        swal("Your Product has been deleted!", {
                            icon: "success",
                      });
                });
            } //else {
            //   swal("Your imaginary file is safe!");
            // }
          });
    }

    return (
        <Container>
            <Row>
                <h3>Product List</h3>
            </Row>
            <Row>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return (
                                    <tr key={product._id}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <Button color="info" href={"/edit/"+product._id}>
                                                <FontAwesomeIcon icon={faEdit}/> Edit
                                            </Button>{" "}
                                            <Button color="danger" onClick={()=>{deleteProduct(product)}}>
                                                <FontAwesomeIcon icon={faTrashAlt}/> Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default ProductList
