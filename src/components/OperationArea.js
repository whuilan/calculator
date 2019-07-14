import React from 'react'

/*基础组件：占一个格子的按钮 */
function SingleButton(props){
  return <button className="button" onClick={props.onClick}>{props.item}</button>
}

/*基础组件：占一个格子的按钮 */
function MergedButton(props){
  return <button className="merge-button" onClick={props.onClick}>{props.item}</button>
}

/*点击区，包括数字、操作符及清零、返回等指令*/
export default class OperationArea extends React.Component {
  
  render(){
    const firstArea = []
    firstArea.push(<SingleButton key="R" item="←" onClick={()=>this.props.onGoBackClick()} />)
    firstArea.push(<SingleButton key="C" item="C" onClick={()=>this.props.onResetClick()}/>)
    firstArea.push(<MergedButton key="=" item="=" onClick={()=>this.props.onClick('=')}/>)
        
    const numbers = [1,2,3,4,5,6,7,8,9]
    const numberArea = numbers.map(item=>{
      return <SingleButton key={item.toString()} item={item} onClick={()=>this.props.onClick(item)} />
    })
    numberArea.push(<MergedButton key="0" item={0} onClick={()=>this.props.onClick(0)}/>)
    numberArea.push(<SingleButton key="." item={'.'}  onClick={()=>this.props.onClick('.')} />)

    const operators = ['/','*','-','+']
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
    )
  }
}
