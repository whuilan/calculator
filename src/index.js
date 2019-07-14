import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function SingleButton(props){
        return <button className="button" onClick={props.onClick}>{props.item}</button>
}

function MergedButton(props){
        return <button className="merge-button" onClick={props.onClick}>{props.item}</button>
}

class  OperationArea extends React.Component{
    render(){
        const firstArea = []
        firstArea.push(<SingleButton key="R" item="←" onClick={()=>this.props.onGoBackClick()} />)
        firstArea.push(<SingleButton key="C" item="C" onClick={()=>this.props.onResetClick()}/>)
        firstArea.push(<MergedButton key="=" item="=" onClick={()=>this.props.onClick('=')}/>)

        const numbers = [1,2,3,4,5,6,7,8,9];
        const numberArea = numbers.map(item=>{
            return <SingleButton key={item.toString()} item={item} onClick={()=>this.props.onClick(item)} />
        })
        numberArea.push(<MergedButton key="0" item={0} onClick={()=>this.props.onClick(0)}/>)
        numberArea.push(<SingleButton key="." item={'.'}  onClick={()=>this.props.onClick('.')} />)

        const operators = ['/','*','-','+'];
        const operatorArea = operators.map((item)=>{
            return <SingleButton key={item} item={item} onClick={()=>this.props.onClick(item)}/>
        })

        return (
            <div className="operation-area">
                <div>
                    {firstArea}
                </div>
                <div>
                    <div className="number-area">
                        {numberArea}
                    </div>
                    <div className="operator-area">
                        {operatorArea}
                    </div>
                </div>
            </div>
        );
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allClicks:'',
            result:null 
        }
    }

    handleNumClick(item){
       let allClicks = this.state.allClicks.slice()
       if(item==='='){
        const ops = new Queue();
        for(let i=0;i<allClicks.length;i++){
            const cha = allClicks.charAt(i);
            if(cha === '+' || cha === '-' || cha === '*' || cha === '/'){
                ops.enqueue(cha)
            }
        }
        console.log(ops)
        const nums = allClicks.split(/[*/+-]/)
        console.log(nums)
        const vals = new Queue();
        for(let num of nums){
            vals.enqueue(parseFloat(num))
        }
        console.log(vals)
        let result = vals.dequeue()
        const size = ops.size();
        console.log(size)
        for(let i=0;i<size;i++){
            const op = ops.dequeue()
            if(op==='+')
                result=result+vals.dequeue()
            else if(op==='-')
                result=result-vals.dequeue()
            else if(op==='*')
                result=result*vals.dequeue()
            else if(op==='/')
                result=result/vals.dequeue()
            else 
                throw Error;
        }
        // console.log(result)
        this.setState({
            result:result
        })
       }else{
        allClicks+=item
        this.setState({
            allClicks:allClicks
        })
        console.log(allClicks)
        // console.log(typeof(allClicks)) 是string
       }
    }

    handleResetClick(){
        this.setState({
            allClicks:'',
            result:null
        })
    }

    handleGoBackClick(){
        console.log("Go back!")
        let allClicks = this.state.allClicks.slice()
        if(!allClicks){
           return;
        }
        allClicks = allClicks.substring(0,allClicks.length-1)
        console.log(allClicks)
        this.setState({
            allClicks:allClicks
        })
    }

    render(){
        const str = this.state.allClicks
        const result = this.state.result
        return (
            <div className="calculator">
                <div className="show-area">
                    <span>{str}</span>
                    <p style={{fontSize:18}}><b>{result}</b></p>
                </div>
                <OperationArea onClick={item=>this.handleNumClick(item)} onResetClick={()=>this.handleResetClick()}
                               onGoBackClick={()=>this.handleGoBackClick()} />
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById("root")
)

class Queue{
    constructor(){
        this.items = []
    }
    enqueue(item){
        this.items.push(item)
    }
    dequeue(){
        return this.items.shift()
    }
    isEmpty(){
        return this.items.length === 0
    }
    size(){
        return this.items.length
    }
}
