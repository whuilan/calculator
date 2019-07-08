import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class  OperationArea extends React.Component{
    render(){

        const commands = ["R","C"]
        const fisrtAreas = commands.map((item,index)=>{
            return <button key={item} className="button">{item}</button>
        })
        fisrtAreas.push(<button key="merge" className="merge-botton">=</button>)

        const numbers = [1,2,3,4,5,6,7,8,9];
        const numberArea = numbers.map((item,index)=>{
            return <button key={index.toString()} className="button">{item}</button>
        })
        numberArea.push(<button key="0" className="merge-botton">0</button>)
        numberArea.push(<button key="." className="button">.</button>)

        const operators = ['/','*','-','+'];
        const operatorArea = operators.map((item)=>{
            return <button key={item} className="button">{item}</button>
        })

        return (
            <div className="operation-area">
                <div className="command-area">
                    {fisrtAreas}
                </div>
                <div className="calculate-area">
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
    render(){
        return (
            <div className="calculator">
                <div className="show-area">
                    {/* <ShowArea /> */}
                </div>
                <OperationArea />
                {/* <div className="operation-area">
                    <OperationArea />
                </div> */}
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById("root")
)
