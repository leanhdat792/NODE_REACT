import React, {Component} from 'react';
import './App.css';
import HeadTitle from './components/HeadTitle';
import Product from './components/Product';
import axios from 'axios';
const getProductData = () => {
  return axios.get('http://localhost:4000/getdata01')
  .then( (res) => res.data ) // trả về giống như return
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  
  componentDidMount(){
    if(this.state.data === null){
      getProductData().then((res) => {
        this.setState({
          data:res
        });
      })
    }
  }

  printData = () => {
    if(this.state.data !== null){
      return this.state.data.map((value, key) => {
        return <Product key={key} product_name={value.product_name} product_price={value.product_price} image={value.image} />
      })
    }
  }
  
  render(){
    console.log(this.state.data);
    return (
      <div>
        <HeadTitle />
        <div className="container">
          <div className="row">
            {this.printData()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
