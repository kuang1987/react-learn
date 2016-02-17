import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {timerJobSelected} from '../actions/timerJobActions'

class DataTable extends Component {
	constructor(props) {
        super(props);
    }

    handleSelect(e) {
    	e.preventDefault();
    	const {dispatch} = this.props;
    	dispatch(timerJobSelected(e.currentTarget.id));
    }

    render(){
    
    const {header,joblist} = this.props;
    	return (
   				<Table responsive striped bordered condensed>
    				<thead>
                   		<tr>{
                         header.map(function (ele){
                          return <th>{ele[1]}</th>
                          })}
                    	</tr>
                 	</thead>


    				<tbody>{((joblist) => {
                 	        if(joblist.length == 0){
                 	        	return null;
                 	        }else{
                 	        	let _ref = this;
                 	        	return joblist.map(function (row){
                            		return (<tr id={row[header[0][0]]} onClick={_ref.handleSelect.bind(_ref)} className={row["style"]}>
                            			{
                               				header.map(function (ele){
                                  			return <th>{row[ele[0]]}</th>;
                               				})
                             	    	}
                            		</tr>)
                          		})
                 	        }
                 		 })(joblist)
                        }
                    </tbody>
                </Table>
    	)
    }
}

export default DataTable;
