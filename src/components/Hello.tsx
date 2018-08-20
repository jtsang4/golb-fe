import * as React from "react";

const styles = require('./Hello.scss');

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
  handleClick = (e: React.MouseEvent<Element>) => {
    import(/* webpackChunkName: "click" */ '../helpers/clickHandler').then(md => {
      const click = md.default;
      click(e)
    })
  };

  render() {
    return <div>
      <h1 className={styles.test} onClick={this.handleClick}>Hello from {this.props.compiler} and {this.props.framework}!</h1>
    </div>;
  }
}