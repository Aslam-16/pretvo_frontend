import React from "react";
import axios from 'axios';

class SearchBuyer extends React.Component{
	constructor(props){
		super()
		this.state={
			data		: [],
			search		: '',
			newdata		: [],
		}
		 this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
    	this.sortByPriceDesc = this.sortByPriceDesc.bind(this);
	}
	
	onChangevalue(e){
		let currentList = [];
    	let newList     = [];
      if (e.target.value !== "") {
		currentList = this.state.data;
		  newList = currentList.filter((data)=>{
			  if(data.buyer_name!=null){
		 const value=e.target.value+""
       if(data.buyer_name.toLowerCase().includes(value.toLowerCase()) || data.product_name.toLowerCase().includes(value.toLowerCase())){
          return data
	  }
	}
	})
	  this.setState({
      newdata: newList
	});
	 console.log("new",this.state.data)
    } else {
	  newList = this.state.data;
	  this.setState({
      newdata: newList,
    });
    } 
	}

	componentDidMount(){
		const option=this;
		axios.get('https://7cb62954488a.ngrok.io/api/v1/buyers/listbuyers')
        .then((response) => {
	     option.setState({data:response.data.data,newdata:response.data.data})
  });
	}
	sortByPriceAsc() {
		var val=this.state.data
		this.setState({

		data:val.sort((a, b) => (a.price_rs - b.price_rs))
		})
		var value=this.state.newdata
		this.setState({

		newdata:value.sort((a, b) => (a.price_rs - b.price_rs))
		})
	}

  

	sortByPriceDesc() {
		var val=this.state.data
		this.setState({

		data:val.sort((a, b) => (b.price_rs - a.price_rs))
	
	})
	var value=this.state.newdata
		this.setState({

		newdata:value.sort((a, b) => (b.price_rs - a.price_rs))
		})
	}

    render(){
		var Arr=[]
		var buyers=this.state.data
			Arr=this.state.newdata.map((items,id)=>{
				return (<div key={id} className="movie-card">
		<div className="movie-content">
			<div className="movie-content-header">
				<a href="#">
					<h3 className="movie-title">{items.buyer_name}</h3>
				</a>
				<div className="info-section">
					<label>Weight</label>
					<span>{items.weight_gsm}</span>
				</div>
				<div className="info-section">
					<label>lead_time</label>
					<span>{items.lead_time}</span>
				</div>
			</div>
			<div className="movie-info">
				<div className="info-section">
					<label>Product Name</label>
					<span>{items.product_name}</span>
				</div>
				<div className="info-section">
					<label>price</label>
					<span>{items.price_rs}</span>
				</div>
				<div className="info-section">
					<label>Quantity</label>
					<span>{items.quantity}</span>
				</div>
				<div className="info-section">
					<label>Product id</label>
					<span>{items.product_id}</span>
				</div>
			</div>
		</div>
		</div>)
			})
	
		
        return(
            <div>
                <div style={{margin:"auto",maxWidth:500,textAlign:'center'}}>
      			   <form className="example">
      			      <div style={{textAlign:'center'}}>
       			        <input type="text" placeholder="Search the Buyer_Name or Product_Name here" name="search2" onChange={(e)=>this.onChangevalue(e)}/>
       			        <button type="button" ><i className="fa fa-search"></i></button>
     			      </div>
					   <br/> 
        			   <button type="button"style={{width:200}} onClick={this.sortByPriceAsc}>
          			   Low to High[Product_Price]
        			   </button>
       				   <button type="button" style={{width:200}}onClick={this.sortByPriceDesc}>
          			   High to Low[Product_Price]
        			  </button>
    			   </form>
    			</div>
              <div className="container">
	                   {Arr}
	           </div>
			</div>
        )
    }

}
export default SearchBuyer;
