import React from 'react';
import AlertMenu, {MenuItem} from '../common/AlertMenu';
import Folder from '../common/Folder';
import store from "../../redux/store";
import {setTitle, registScrollElementsFixed, showSheet} from "../../redux/actions/page-actions";
import FieldInput from '../field/FieldInput';
import Loading from "../common/Loading";
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
        this.form = null;
        this.mode = props.match.params.code? 'update': 'create';
        this.removeEntities = [];
        this.fieldInputMap = new Map();
        this.submitUpdate = this.submitUpdate.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
    }

    submitUpdate(){
        let _update = this;

        let formData = new FormData();

        //1、获得form下面的所有field-input
        let fieldInputs = [];
        let $formFieldInputs = this.form.getElementsByClassName('field-input');
        for(let i = 0; i < $formFieldInputs.length; i++){
            let $input = $formFieldInputs[i];
            let fieldInput = _update.getFieldInput($input);
            if(fieldInput && fieldInput.getUUID()){
                fieldInputs.push(fieldInput);
            }
        }
        //2、根据策略获得所有fieldInput的值
        let validateError = false;
        //3、校验表单值，放入code值
        let modifiedFieldCount = 0;
        fieldInputs.forEach((fieldInput)=>{
           let thisValidateResult = _update.validateFieldInput(fieldInput);
           if(!validateError && thisValidateResult === false){
               validateError = true;
           }
           if(fieldInput.isStrict() || fieldInput.isModified()){
               if(typeof fieldInput.isHidden === 'function' && !fieldInput.isHidden()){
                   modifiedFieldCount++;
               }
               formData.append(fieldInput.getName(), fieldInput.getValue());
           }
        });
        //4、统计表单修改数，新增数、删除数
        //计算arrayComposite中创建和选择的entity的数量
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
        if(!validateError){
            //验证成功
            formData.delete('唯一编码');
            if(this.state.entity && this.state.entity.code){
                formData.append('唯一编码', this.state.entity.code);
            }
            //5、询问提交确认
            this.dialog.confirm(`共修改了${modifiedFieldCount}个字段，创建了${createEntitiesCount}条多值属性/关联，`
                +`新选择了${selectedEntitiesCount}条多值属性/关联，`
                +`删除了${this.removeEntities.length}条多值属性/关联`, '确认保存？', ()=>{
                //6、提交到后台
                utils.fetch(`/api/entity/update/${_update.props.match.params.menuId}`,formData).then((data)=>{
                    if(data.status === 'suc'){
                        _update.dialog.alert('保存成功', '', ()=>{
                            if(this.mode === 'update'){
                                _update.props.history.go(0);
                            }else{
                                _update.props.history.push(`/entity/detail/${_update.props.match.params.menuId}/${data.code}`);
                            }
                        });
                    }else{
                        _update.dialog.alert('保存失败');
                    }
                });
            })
        }
    }

    /**
     * 把FieldInput放到当前页面中的FieldInputMap容器中
     * @param fieldInput
     */
    putFieldInput(fieldInput) {
        if(fieldInput){
            if(fieldInput instanceof FieldInput){
                let uuid = fieldInput.getUUID();
                if(uuid){
                    this.fieldInputMap.set(uuid, fieldInput);
                }
            }else if(fieldInput.filedInputAdapter){
                let uuid = fieldInput.filedInputAdapter.getUUID();
                if(uuid){
                    this.fieldInputMap.set(uuid, fieldInput.filedInputAdapter);
                }
            }
        }
    }

    /**
     * 根据field-input的元素获得对应的FieldInput对象
     * @param $input html元素，拥有uuid属性，将会根据该uuid映射到对应的FieldInput对象
     * @returns {FieldInput}
     */
    getFieldInput($input) {
        let uuid = $input.getAttribute("uuid");
        if(uuid){
            return this.fieldInputMap.get(uuid);
        }
    }
    validateFieldInput(fieldInput){
        fieldInput.validate();
    }

    reloadPage(){

    }
    componentDidMount() {
        if(this.mode === 'update'){
            utils.fetch(`/api/entity/detail/${this.props.match.params.menuId}/${this.props.match.params.code}`)
                .then((data)=>{
                    if(data.entity){
                        this.setState({
                            entity : data.entity,
                            registScroll: true
                        }, ()=>{
                            store.dispatch(setTitle(`修改-${this.state.entity.title}`))
                        });
                    }
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
    arrayEntityRemovable(fieldGroup, arrayEntity){
        return fieldGroup.composite.access === '写'
            || !arrayEntity.source;
    }
    showArrayEntityMenu(fieldGroup, compositeEntity){
        if(fieldGroup && fieldGroup.array && compositeEntity){
            let array = fieldGroup.array;
            if(this.arrayEntityRemovable(fieldGroup, compositeEntity)){
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
            }else{
                this.dialog.alert('不可移除');
            }
        }
    }
    isFieldReadonly(field) {
        let fieldAccess = field.access;
        return fieldAccess === '读'
            || fieldAccess === '补' && field.value !== '';
    }
    renderFields(fieldGroup) {
        return fieldGroup.fields.map((field)=>
            {
                let readonly = this.isFieldReadonly(field);
                return (
                    <div key={field.id} className={`entity-field ${field.available? '': 'entity-field-unavailable'} ${readonly? 'entity-field-readonly':''}`}>
                        <label>{field.title}</label>
                        <div>
                            <FieldInput ref={(ins)=>{this.putFieldInput(ins)}}
                                        readonly={readonly}
                                        name={field.fieldName}
                                        field={field} />
                        </div>
                        {field.available? null: <span><i className={`iconfont icon-warning`}></i></span>}
                    </div>
                )
            }
        )
    }
    renderArray(fieldGroup) {
        return fieldGroup.array.map((compositeEntity, index)=>
            <Folder key={`${compositeEntity.code}-${index}`} className={`entity-field-group-array source-${compositeEntity.source}`}>
                <FieldInput hidden={true}
                            strict={!compositeEntity.source}
                            ref={(ins)=>{this.putFieldInput(ins)}}
                            name={`${fieldGroup.composite.name}[${index}].唯一编码`}
                            value={compositeEntity.code}/>
                <div className="entity-item-header">
                    <em>{index + 1}</em>
                    {
                        this.arrayEntityRemovable(fieldGroup, compositeEntity)?
                            <span onClick={()=>this.showArrayEntityMenu(fieldGroup, compositeEntity)}><i className="iconfont icon-menu2"></i></span>
                            :null

                    }
                </div>
                {
                    fieldGroup.composite && fieldGroup.composite.relationKey?
                        <div className={`entity-field ${fieldGroup.composite.relationLabelAccess === '读'?'entity-field-readonly':''}`}>
                            <label>关系</label>
                            <div>
                                <InputSheet
                                    ref={(ins)=>{this.putFieldInput(ins)}}
                                    readonly={fieldGroup.composite.relationLabelAccess === '读'}
                                    name={`${fieldGroup.composite.name}[${index}].$$label$$`}
                                    options={fieldGroup.composite.relationSubdomain}
                                    defaultValue={compositeEntity.relation}
                                />
                            </div>
                        </div>
                        :null
                }
                {
                    compositeEntity.fields.map((field, fieldIndex)=>{
                        let readonly = this.isFieldReadonly(field);
                        return (
                            <div key={field.id} className={`entity-field ${field.available? '': 'entity-field-unavailable'} ${readonly? 'entity-field-readonly':''}`}>
                                <label>{field.title}</label>
                                <div>
                                    <FieldInput ref={(ins)=>{this.putFieldInput(ins)}}
                                                readonly={readonly}
                                                name={this.generateArrayFieldName(fieldGroup.descs[fieldIndex], index)}
                                                field={field}/>
                                </div>
                                {field.available? null: <span><i className={`iconfont icon-warning`}></i></span>}
                            </div>
                        )
                    })
                }
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
                "fieldId": field.fieldId,
                "access": field.access,
                "additionAccess": field.additionAccess,
                "validators" : field.validators
            });
        }
        return entity;
    }
    fieldGroupArrayPushable(fieldGroup) {
        let compositeAccess = fieldGroup.composite.access;
        let arrayPushable =
            !(compositeAccess === '读' ||
                compositeAccess === '补'
                && Array.isArray(fieldGroup.array)
                && fieldGroup.array.length > 0);
        return arrayPushable;
    }
    showFieldGroupMenu(fieldGroup) {
        let _this = this;
        let menus = [];
        if(this.fieldGroupArrayPushable(fieldGroup)){
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
        }else{
            this.dialog.alert('该字段组不可修改');
        }
    }
    render() {
        if(this.state.entity == null){
            return <Loading/>
        }
        return(
            <div>
                <div ref={(instance)=>this.$entityUpdate = instance} className="entity-update">
                    <form ref={(ins)=>this.form = ins}>
                        {
                            this.state.entity.fieldGroups.map((fieldGroup)=>{
                                let isArray = fieldGroup.fields == null;
                                return (
                                    <div key={fieldGroup.id} className="entity-field-group">
                                        <div className="entity-field-group-title">
                                            <div>
                                                <h3>{fieldGroup.title}</h3>
                                                {isArray && this.fieldGroupArrayPushable(fieldGroup)?
                                                    <span onClick={()=>this.showFieldGroupMenu(fieldGroup)}>
                                                        <i className="iconfont icon-horizontal-menu"></i>
                                                        <FieldInput hidden={true}
                                                                    strict={true}
                                                                    name={`${fieldGroup.composite.name}.$$flag$$`}
                                                                    ref={(ins)=>this.putFieldInput(ins)}
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
                    </form>
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