import React from 'react';
import {PhotoSwipe} from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
export default class FieldValue extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showGallery: false,
            galleryWidth: 0,
            galleryHeight: 0,
            galleryOption: {
                shareEl     : false
            },
            value   : props.field.value
        }
        this.showFile = this.showFile.bind(this);
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
    }
    showFile() {
        const field = this.props.field;
        if(field != null && this.isPhotoFile()){
            const width = this.refs.thumb.naturalWidth;
            const height = this.refs.thumb.naturalHeight;
            this.setState({
                showGallery: true,
                galleryWidth   : width,
                galleryHeight  : height
            });
        }
    }
    isPhotoFile() {
        const field = this.props.field;
        if(field && typeof field.value === 'string'){
            let reg = /.*\.(gif|jpg|jpeg|png|bmp|ico)$/i;
            return reg.test(field.value);
        }
        return false;
    }
    getValue(){
        return this.state.value;
    }
    setValue(value){
        if(typeof value !== 'undefined'){
            this.setState({
                value: value
            });
        }
    }
    render(){
        const field = this.props.field;
        const fileHost = '/file-server';
        switch (field.type) {
            case 'file':
                if(field.value){
                    return (
                        <div>
                            <span className="field-file-value" onClick={this.showFile}>
                                <img ref="thumb" src={`${fileHost}/${field.value}`} alt="" />
                            </span>
                            <PhotoSwipe isOpen={this.state.showGallery}
                                        onClose={()=>{this.setState({showGallery: false})}}
                                        options={this.state.galleryOption}
                                        items={[{src:`${fileHost}/${field.value}`,
                                            w: this.state.galleryWidth,
                                            h: this.state.galleryHeight}]} />
                        </div>
                    )
                }else{
                    return null;
                }
            default:
                return <span field-type={field.type}>{this.state.value}</span>;
        }
    }
}