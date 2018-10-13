import React from 'react';

class Folder extends React.Component{
    render() {
        return (
            <div className={this.props.className} id={this.props.id}>
                {this.props.children}
            </div>
        );
    }
}

export default Folder;