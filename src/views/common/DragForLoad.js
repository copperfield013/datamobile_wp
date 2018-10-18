import React from 'react';
import {getBrowser} from "../../redux/actions/page-actions";

export default class DragForLoad extends React.Component{
    constructor() {
        super();
        this.state = {
            scrollLoad  : getBrowser().versions.ios
        }
    }
    componentDidMount() {
        if(this.state.scrollLoad){
            const _this = this;
            let reachedBottom = false;
            let overBottom = false;
            document.addEventListener('scroll', function(event){
                const container = _this.props.container();
                const originTop = container.offsetTop;
                console.log(`containerHeight=${container.clientHeight}`);
                console.log(`originTop=${originTop}`);
                console.log(`screentHeight=${window.screen.height}`);
                const maxHeight = container.clientHeight - window.screen.height + originTop;
                console.log('max==' + maxHeight);
                console.log(`current=${event.srcElement.scrollingElement.scrollTop}`);
                let func = function(){
                    if(reachedBottom){
                        if(!overBottom){
                            if(event.srcElement.scrollingElement.scrollTop > maxHeight){
                            }else{
                                _this.refs.main.classList.add('drag-disable');
                            }
                            overBottom = true;
                        }
                    }
                }
                if(!reachedBottom && event.srcElement.scrollingElement.scrollTop == maxHeight){
                    reachedBottom = true;
                    console.log('到底了');
                    document.addEventListener('touchmove', func, {once: true});
                    return;
                }
                func();
            });
        }
    }
    render() {
        return (
            <div ref="main" className={`drag-for-load ${this.state.scrollLoad? '': 'drag-disable'} ${this.props.position === 'top'? 'drag-for-load-top': 'drag-for-load-bottom'}`}>
                <p></p>
            </div>
        )

    }
}