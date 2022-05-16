import React from "react";

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      number: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    this.setState((state) => {
      return { number: ++state.number }
    });
  }
  decrement() {
    this.setState((state) => ({ number: --state.number }));
  }
  render() {
    return (
      <div>
        <button onClick={this.decrement}>-</button>
        <span>{this.state.number}</span>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default Counter;
