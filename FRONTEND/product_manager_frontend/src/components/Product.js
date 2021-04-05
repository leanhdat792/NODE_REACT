import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <div className="col-4 mb-3">
                <div className="card text-left">
                    <img className="card-img-top" src={this.props.image} />
                    <div className="card-body">
                        <h5 className="float-left">{this.props.product_name}</h5>
                        <h6 className="float-right">{this.props.product_price}</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;