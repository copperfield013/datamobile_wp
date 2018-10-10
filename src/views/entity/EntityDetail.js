import React from 'react';

class EntityDetail extends React.Component{
    componentWillMount() {
        console.log('详情');
        document.title = '详情)';
    }
    render() {
        return(
            <div></div>
        );
    }
}

export default EntityDetail;