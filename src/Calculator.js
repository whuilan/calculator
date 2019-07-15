import React from 'react'
import OperationArea from './components/OperationArea'
import { Queue } from './utils/Queue'
import './index.css'

const opt = (op, result, vals) => {
  if(op==='+')
    result=result+vals
  else if(op==='-')
    result=result-vals
  else if(op==='*')
    result=result*vals
  else if(op==='/')
    result=result/vals
  else 
    throw Error
  return result
}

export default class Calculator extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      allClicks:'',
      result:null 
    }
  }
    
  /*点击操作区的按钮时的回调函数，没有点击“=”就全部显示在显示区，
    点击 “=”就分别提取操作符和操作数进入队列(先进先出)，按顺序计算结果*/
  handleNumClick(item){
    let allClicks = this.state.allClicks.slice()
    if(item==='='){
      const ops = new Queue()
      for(let i=0;i<allClicks.length;i++){
        const cha = allClicks.charAt(i)
        if(cha === '+' || cha === '-' || cha === '*' || cha === '/'){
          ops.enqueue(cha)
        }
      }
      const nums = allClicks.split(/[*/+-]/)
      const vals = new Queue()
      for(let num of nums){
        vals.enqueue(parseFloat(num))
      }
      let result = vals.dequeue()
      const size = ops.size()
      for(let i=0;i<size;i++){
        const op = ops.dequeue()
        result = this.opt(op, result, vals.dequeue())
      }
      this.setState({
        result:result
      })
    }
    else{
      allClicks+=item
      this.setState({
        allClicks:allClicks
      })
    }
  }

  handleNumClickV2 (item) {
    // lastOpt表示上一个操作符的位置，-1表示没有上一个操作符
    const { allClicks } = this.state
    // 判断是否重复输入操作符，是则不添加
    if (allClicks.length > 0
      && ['+', '-', '*', '/'].indexOf(item) >= 0
      && ['+', '-', '*', '/'].indexOf(allClicks.charAt(allClicks.length - 1)) >= 0) {
      return
    }
    // 输入为=时结算
    if (item === '=') {
      // 判断有无输入或上次输入是否为运算符，是则不运算
      if (allClicks.length === 0 || ['+', '-', '*', '/'].indexOf(allClicks.charAt(allClicks.length - 1)) >= 0) {
        return
      }
      let result = 0, lastOpt = -1
      for(let i = 0; i < allClicks.length; i++) {
        if (['+', '-', '*', '/'].indexOf(allClicks.charAt(i)) >= 0) {
          if (lastOpt === -1) {
            // 没有上个操作符时，默认等于首值
            result = parseFloat(allClicks.substring(0, i))
          } else {
            // 计算上个操作符，左侧：已经结合成result，右侧: 到下个运算符之间的值
            result = opt(allClicks.charAt(lastOpt), result, parseFloat(allClicks.substring(lastOpt+1, i)))
          }
          // 记录上个操作符位置
          lastOpt = i
        }
      }
      // 最后剩余一个数，直接运算
      result = lastOpt === -1 ? parseFloat(allClicks) : opt(allClicks.charAt(lastOpt), result, parseFloat(allClicks.substring(lastOpt+1, allClicks.length)))
      this.setState({
        result
      })
    } else {
      this.setState({
        allClicks: allClicks+item
      })
    }
  }

  /*点击清零键将输入置零 */
  handleResetClick(){
    this.setState({
      allClicks : '',
      result:null
    })
  }

  /*点击退回键，删除最后一个字符 */
  handleGoBackClick(){
    // UPDATE: 解析state时尽量用parse形式
    let { allClicks } = this.state
    if(!allClicks){
      return
    }
    allClicks = allClicks.substring(0,allClicks.length-1)
    // UPDATE: 赋值时尽量用parse形式
    this.setState({
      allClicks
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
        <OperationArea
          onClick={item=>this.handleNumClickV2(item)}
          onResetClick={()=>this.handleResetClick()}
          onGoBackClick={()=>this.handleGoBackClick()}
        />
      </div>
    )
  }
}

/*运算时需要用到的数据结构：队列 */

