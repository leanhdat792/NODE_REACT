import React, { Component } from 'react';
import axios from 'axios';

const addProductAction = (product_name, product_price, image) => (
    axios.post('/add', {product_name, product_price, image}).then((resp) => resp.data)
)
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            product_price: '',
            image: ''
        }
    }

    isChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleClick = () => {
        var {product_name, product_price, image} = this.state;
        addProductAction(product_name, product_price, image).then((response) => {
            console.log(response);
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                    <div className="col-8 mx-auto">
                        <form>
                            <div className="form-group">
                                <label htmlFor="product_name">Tên sản phẩm</label>
                                <input onChange={(event) => this.isChange(event)} type="text" className="form-control" name="product_name" id="product_name" aria-describedby="name_text" placeholder="Nhập tên sản phẩm" />
                                <small id="name_text" className="form-text text-muted">Nhập text vào</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="product_price">Giá sản phẩm</label>
                                <input onChange={(event) => this.isChange(event)} type="text" className="form-control" name="product_price" id="product_price" aria-describedby="price_text" placeholder="Nhập giá sản phẩm" />
                                <small id="price_text" className="form-text text-muted">Nhập text vào</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Đường link ảnh sản phẩm</label>
                                <input onChange={(event) => this.isChange(event)} type="text" className="form-control" name="image" id="image" aria-describedby="price_text" placeholder="Nhập ảnh sản phẩm" />
                                <small id="price_text" className="form-text text-muted">Nhập link ảnh vào</small>
                            </div>
                            <button type="reset" onClick={() => this.handleClick()} className="btn btn-info">Thêm mới</button>
                        </form>
                    </div>
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProduct;