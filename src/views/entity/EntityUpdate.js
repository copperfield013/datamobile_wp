import React from 'react';

class EntityUpdate extends React.Component{
    componentWillMount() {
        console.log('修改');
        document.title = '修改)';
    }
    render() {
        return (
            <div>


            </div>
            );
    }
}

export default EntityUpdate;