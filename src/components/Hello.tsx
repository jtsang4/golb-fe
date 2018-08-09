import * as React from "react";

import './Hello.css';

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1 className='test'>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}