import React from 'react';

export default class Loading extends React.Component{

    componentDidMount() {
    }
    render() {
        return (
            <div className={`common-loading ${this.props.show === true? 'common-loading-loading': ''}`}>
                <div className="common-loading-mask"></div>
                <div className="common-loading-toast">
                    <div className="loadEffect">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p className="common-loading-content">Loading...</p></div>
            </div>
        )
    }
}