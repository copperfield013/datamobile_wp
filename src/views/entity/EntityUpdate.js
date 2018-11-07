import React from 'react';
import AlertMenu, {MenuItem} from '../common/AlertMenu';
import Folder from '../common/Folder';
import store from "../../redux/store";
import {setTitle, registScrollElementsFixed, showSheet} from "../../redux/actions/page-actions";
import FieldInput from '../field/FieldInput';
import Loading from "../common/Loading";
import FieldInputMap from "../field/FieldInputMap";
import Dialog from '../common/Dialog';
import InputSheet from '../field/InputSheet';
import utils from "../../utils/Utils";
import ArrayEntityItemList from "../field/ArrayEntityItemList";

const ENTITY_SOURCE_SELECTED = 'selected';
const ENTITY_SOURCE_CREATE = 'create';
class EntityUpdate extends React.Component{
    constructor(props) {
        super(props);
        console.log(props.history);
        this.state = {
            entityListURL: `/entity/list/${props.match.params.menuId}`,
            entity: null,
            saveSucceed: false
        };
        this.mode = props.match.params.code? 'update': 'create';
        this.inputMap = new FieldInputMap();
        this.removeEntities = [];
        this.submitUpdate = this.submitUpdate.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    submitUpdate(){
        let _this = this;
        let formData = new FormData();
        if(this.state.entity && this.state.entity.code){
            formData.append('唯一编码', this.state.entity.code);
        }
        let createEntitiesCount = 0,
            selectedEntitiesCount = 0;
        this.state.entity.fieldGroups.forEach((fieldGroup)=>{
            if(fieldGroup.array){
                fieldGroup.array.forEach((compositeEntity)=>{
                    if(compositeEntity.source === ENTITY_SOURCE_CREATE){
                        createEntitiesCount++;
                    }else if(compositeEntity.source === ENTITY_SOURCE_SELECTED){
                        selectedEntitiesCount++;
                    }
                });
            }
        });
        let modifiedFieldCount = 0;
        this.inputMap.forEach((input)=>{
            let modified = input.isModified();
            if(input.isStrict() || modified){
                if(modified){
                    modifiedFieldCount++;
                }
                console.log(`${input.getName()}=${input.getValue()}`);
                formData.append(input.getName(), input.getValue());
            }
        });
        if(modifiedFieldCount > 0 || this.removeEntities.length > 0
        || createEntitiesCount > 0 || selectedEntitiesCount > 0){
            this.dialog.confirm(`共修改了${modifiedFieldCount}个字段，创建了${createEntitiesCount}条多值属性/关联，`
                +`新选择了${selectedEntitiesCount}条多值属性/关联，`
                +`删除了${this.removeEntities.length}条多值属性/关联`, '确认保存？', ()=>{
                utils.fetch(`/api/entity/update/${this.props.match.params.menuId}`,formData).then((data)=>{
                    if(data.status === 'suc'){
                        _this.dialog.alert('保存成功', '', ()=>{
                            if(this.mode === 'update'){
                                _this.props.history.go(0);
                            }else{
                                _this.props.history.push(`/entity/detail/${this.props.match.params.menuId}/${data.code}`);
                            }
                        });
                    }else{
                        _this.dialog.alert('保存失败');
                    }
                });
            })
        }else{
            this.dialog.alert('没有修改数据');
        }
    }
    reloadPage(){

    }
    componentWillMount () {

    }
    componentDidMount() {
        if(this.mode === 'update'){
            utils.fetch(`/api/entity/detail/${this.props.match.params.menuId}/${this.props.match.params.code}`)
                .then((data)=>{
                    this.setState({
                        entity : data.entity,
                        registScroll: true
                    });
                    store.dispatch(setTitle(`修改-${this.state.entity.title}`));
                });
        }else{
            utils.fetch(`/api/entity/dtmpl/${this.props.match.params.menuId}`).then((data)=>{
                this.setState({
                    entity : data.entity,
                    registScroll: true
                });
                store.dispatch(setTitle(`创建-${data.module.title}`));
            });
        }
    }
    generateArrayFieldName(desc, index){
        if(desc && desc.format){
            return desc.format.replace('ARRAY_INDEX_REPLACEMENT', index);
        }
        return null;
    }
    showArrayEntityMenu(array, compositeEntity){
        if(array && compositeEntity){
            store.dispatch(showSheet(['删除'], ()=>{
                this.dialog.confirm('确认删除？', '', ()=>{
                    let index = array.indexOf(compositeEntity);
                    if(index >= 0){
                        array.splice(index, 1);
                        this.setState({entity: this.state.entity});
                        if(!compositeEntity.source){
                            //删除的compositeEntity是原本存在的
                            this.removeEntities.push(compositeEntity);
                        }
                    }
                });
            }));
        }
    }
    renderFields(fieldGroup) {
        return fieldGroup.fields.map((field)=>
            <div key={field.id} className={`entity-field ${field.available? '': 'entity-field-unavailable'}`}>
                <label>{field.title}</label>
                <div>
                    <FieldInput name={field.fieldName} inputMap={this.inputMap} field={field} />
                </div>
                {field.available? null: <span><i className={`iconfont icon-warning`}></i></span>}
            </div>
        )
    }
    renderArray(fieldGroup) {
        return fieldGroup.array.map((compositeEntity, index)=>
            <Folder key={`${compositeEntity.code}-${index}`} className={`entity-field-group-array source-${compositeEntity.source}`}>
                <FieldInput hidden={true}
                            strict={true}
                            name={`${fieldGroup.composite.name}[${index}].唯一编码`}
                            inputMap={this.inputMap}
                            value={compositeEntity.code}/>
                <div className="entity-item-header">
                    <em>{index + 1}</em>
                    <span onClick={()=>this.showArrayEntityMenu(fieldGroup.array, compositeEntity)}><i className="iconfont icon-menu2"></i></span>
                </div>
                {
                    fieldGroup.composite && fieldGroup.composite.relationKey?
                        <div className="entity-field">
                            <label>关系</label>
                            <div>
                                <InputSheet
                                    name={`${fieldGroup.composite.name}[${index}].$$label$$`}
                                    inputMap={this.inputMap}
                                    options={fieldGroup.composite.relationSubdomain}
                                    defaultValue={compositeEntity.relation}
                                />
                            </div>
                        </div>
                        :null
                }
                {compositeEntity.fields.map((field, fieldIndex)=>
                    <div key={field.id} className={`entity-field ${field.available? '': 'entity-field-unavailable'}`}>
                        <label>{field.title}</label>
                        <div>
                            <FieldInput name={this.generateArrayFieldName(fieldGroup.descs[fieldIndex], index)} inputMap={this.inputMap} field={field}/>
                        </div>
                        {field.available? null: <span><i className={`iconfont icon-warning`}></i></span>}
                    </div>

                )}
            </Folder>
        );
    }
    componentDidUpdate(props, state){
        console.log(`registScroll=${state.registScroll}`);
        if(state.registScroll){
            this.setState({
                registScroll: false
            }, ()=>{
                let t = this.$entityUpdate.getElementsByClassName('entity-field-group-title');
                registScrollElementsFixed('EntityUpdate', t);
            })
        }
    }
    createEntityComposite(fieldDescs, loadedEntity){
        let entity =  {
            fields  : []
        };
        if(loadedEntity){
            entity.source = ENTITY_SOURCE_SELECTED;
        }else{
            loadedEntity = {};
            entity.source = ENTITY_SOURCE_CREATE;
        }
        entity.code  = loadedEntity['唯一编码'] || '';
        for(let i in fieldDescs){
            let field = fieldDescs[i];
            entity.fields.push({
                "optionKey": field.optionKey,
                "available": field.available,
                "id": field.id,
                "title": field.title,
                "type": field.type,
                "value": loadedEntity[field.fieldName] || '',
                "fieldId": field.fieldId
            });
        }
        return entity;
    }
    showFieldGroupMenu(fieldGroup) {
        let _this = this;
        let menus = [];
        menus.push({
            label   : '新建',
            onClick : ()=>{
                console.log('新建====');
                let newEntityComposite = this.createEntityComposite(fieldGroup.descs);
                fieldGroup.array = [...fieldGroup.array, newEntityComposite];
                this.setState({entity  : this.state.entity});
            }
        });
        if(fieldGroup.stmplId){
            let excepts = [];
            fieldGroup.array.forEach((entity)=>excepts.push(entity.code));
            let fieldNames = [];
            fieldGroup.descs.forEach((desc)=>fieldNames.push(desc.fieldName));
            menus.push({
                label   : '选择',
                onClick : ()=>{
                    console.log('选择====');
                    this.setState({
                       stmplData    : {
                           stmplId  : fieldGroup.stmplId,
                           excepts  : excepts,
                           onComplete: (code, req)=>{
                               console.log(code);
                               req(fieldNames).then((data)=>{
                                   console.log(data);
                                   if(data.entities){
                                       let entityComposites = [];
                                       for(let code in data.entities){
                                           let newEntityComposite = this.createEntityComposite(fieldGroup.descs, data.entities[code]);
                                           entityComposites.push(newEntityComposite);
                                       }
                                       fieldGroup.array = [...fieldGroup.array, ...entityComposites];
                                       this.setState({entity  : this.state.entity});
                                   }
                               })
                               this.setState({stmplData: null});

                           },
                           onCancel : ()=>{
                               this.setState({stmplData: null});
                           }
                       }
                    });
                }
            })
        }
        store.dispatch(showSheet(menus));
    }
    render() {
        if(this.state.entity == null){
            return <Loading/>
        }
        return(
            <div>
                <div ref={(instance)=>this.$entityUpdate = instance} className="entity-update">
                    {
                        this.state.entity.fieldGroups.map((fieldGroup)=>{
                            let isArray = fieldGroup.fields == null;
                            return (
                                <div key={fieldGroup.id} className="entity-field-group">
                                    <div className="entity-field-group-title">
                                        <div>
                                            <h3>{fieldGroup.title}</h3>
                                            {isArray?
                                                <span onClick={()=>this.showFieldGroupMenu(fieldGroup)}>
                                                    <i className="iconfont icon-horizontal-menu"></i>
                                                    <FieldInput hidden={true}
                                                                strict={true}
                                                                name={`${fieldGroup.composite.name}.$$flag$$`}
                                                                inputMap={this.inputMap}
                                                                value={true}/>
                                                </span>
                                                : null}

                                        </div>
                                    </div>
                                    {!isArray?
                                        this.renderFields(fieldGroup)
                                        : this.renderArray(fieldGroup)}
                                </div>
                            )
                        })
                    }
                </div>
                <AlertMenu>
                    <MenuItem onClick={()=>{this.submitUpdate()}} title="保存" iconfont="icon-save" />
                    <MenuItem href="/" title="首页" iconfont="icon-caidan05"  />
                    {
                        this.state.entityListURL?
                            <MenuItem href={this.state.entityListURL} title="返回列表" iconfont="icon-list"  />
                            : null
                    }
                </AlertMenu>
                <Dialog ref={(instance)=>this.dialog = instance} />
                {this.state.stmplData?
                    <ArrayEntityItemList stmplId={this.state.stmplData.stmplId}
                                         menuId={this.props.match.params.menuId}
                                         excepts={this.state.stmplData.excepts}
                                         onComplete={this.state.stmplData.onComplete}
                                         onCancel={this.state.stmplData.onCancel}

                    />
                    :null}
            </div>
        );
    }
}

export default EntityUpdate;