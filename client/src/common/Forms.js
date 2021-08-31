import React, { Component } from "react";
import './Forms.css'

/* https://reactjs.org/docs/forms.html */

class Redirect extends Component {
    constructor(props) {
        super(props);
        this.page = props.page;
    }

    render() {
        return (
            <input type="hidden" name="redirect" value={'http://localhost:4005/' + this.page} />
        )
    }
}

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.data = {
            "name": props.name,
            "id": props.id,
        }
        this.state = {
            "value": props.value
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.setState({value: event.target.checked});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value});
    }

    render() {
        return (
            <div className="formcontrol">
                <label for={this.data.id}>{this.data.name}</label>
                <input type="checkbox" id={this.data.id} name={this.data.id} value="true" onChange={this.handleClick} checked={this.state.value} />
            </div>
        )
    }
}

class Password extends Component{
    constructor(props) {
        super(props);
        this.data = {
            "name": props.name,
            "id": props.id,
            "placeholder": props.placeholder,
            "toggle": props.toggle
        }
        this.state = {
            "value": props.value,
            "visible": 'password'
        }

        this.changeVisibility = this.changeVisibility.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeVisibility(event) {
        if (this.state.visible == "password") return this.setState({value: this.state.value, visible: 'text'});
        this.setState(this.setState({value: this.state.value, visible: 'password'}));
    }

    handleChange(event) {
        this.setState({value: event.target.value, visible: this.state.visible})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value, visible: this.state.visible});
    }

    render(){
        if (this.data.toggle){
            return (
                <div className="formcontrol">
                    <label for={this.data.id}>{this.data.name}</label>
                    <input type={this.state.visible} id={this.data.id} onChange={this.handleChange} name={this.data.id} value={this.state.value} placeholder={this.data.placeholder} />
                </div>
            )
        }
        return (
            <div className="formcontrol">
                <label for={this.data.id}>{this.data.name}</label>
                <input class="toggleVisPass" type={this.state.visible} id={this.data.id} onChange={this.handleChange} name={this.data.id} value={this.state.value} placeholder={this.data.placeholder} />
                <button class="toggleVisPass" type="button" onClick={this.changeVisibility}>Toggle</button> {/* styling doen pls --> cool icon pls */}
            </div>
        )
    }
}

class Text extends Component{
    constructor(props) {
        super(props);
        this.data = {
            "name": props.name,
            "id": props.id,
            "placeholder": props.placeholder,
        }

        let disabled = false;
        if (props.hasOwnProperty('disabled')){
            disabled = props.disabled;
        }

        this.state = {
            "value": props.value,
            "disabled": disabled
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value, disabled: this.state.disabled})
    }

    componentWillReceiveProps(nextProps) {
        let disabled = false;
        if (nextProps.hasOwnProperty('disabled')){
            disabled = nextProps.disabled;
        }

        this.setState({ 
            value: nextProps.value, 
            disabled: disabled
        });
    }

    render(){
        return (
            <div className="formcontrol">
                <label for={this.data.id}>{this.data.name}</label>
                <input type="text" id={this.data.id} onChange={this.handleChange} name={this.data.id} value={this.state.value} placeholder={this.data.placeholder} disabled={this.state.disabled} />
            </div>
        )
    }
}

class ArrayTextListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            index: props.index
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState = {
            value: nextProps.value,
            index: nextProps.index
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value, index: this.state.index})
    }

    render() {
        return (
            <div className="formcontrol">
                <input className="toggleVisPass" type="text" onChange={this.handleChange} value={this.state.value} id={this.state.index} />
                <button className="toggleVisPass deleteBtn" type="button">Delete</button>
            </div>
        )
    }
}

class ArrayTextList extends Component {
    constructor(props) {
        super(props);

        let deleteBtn = false;
        if (props.hasOwnProperty('deleteBtn')){
            deleteBtn = props.deleteBtn;
        }

        let deleteUrl = null;   
        if (props.hasOwnProperty('deleteUrl')){
            deleteUrl = props.deleteUrl
        }


        console.log(props)
        this.state = {
            listItems: props.listItems,
            deleteBtn: deleteBtn,
            deleteUrl: deleteUrl
        }
    }

    componentWillReceiveProps(nextProps) {
        let deleteBtn = false;
        if (nextProps.hasOwnProperty('deleteBtn')){
            deleteBtn = nextProps.deleteBtn;
        }

        let deleteUrl = null;
        if (nextProps.hasOwnProperty('deleteUrl')){
            deleteUrl = nextProps.deleteUrl
        }

        this.state = {
            listItems: nextProps.listItems,
            deleteBtn: deleteBtn,
            deleteUrl: deleteUrl
        }
    }
    
    
    render() {
        let listItems;
        if (typeof this.state.listItems === 'undefined' || this.state.listItems.length == 0){
            listItems = <p>No Admins</p>
        } else {
            listItems = this.state.listItems.map((item, i) => 
                <ArrayTextListItem value={item} index={i} />
            );
        }

        return (
            <div className="arrayTextList">
                {listItems}
            </div>
        )
    }
}

class Submit extends Component {
    constructor(props) {
        super(props);

        let disabled = false;
        if (props.hasOwnProperty('disabled')){
            disabled = props.disabled;
        }

        let forProp = undefined;
        if (props.hasOwnProperty('for')){
            forProp = props.for;
        }

        this.state = {
            "name": props.name,
            "id": props.id,
            "for": forProp,
            "disabled": disabled
        }
    }

    componentWillReceiveProps(nextProps) {
        let disabled = false;
        if (nextProps.hasOwnProperty('disabled')){
            disabled = nextProps.disabled;
        }
        
        let forProp = undefined;
        if (nextProps.hasOwnProperty('for')){
            forProp = nextProps.for;
        }

        this.setState({
            "name": nextProps.name,
            "id": nextProps.id,
            "for": forProp,
            "disabled": disabled
        });
    }

    render() {
        if (this.state.for === 'undefined'){
            return (
                <button type="submit" id={this.state.id} disabled={this.state.disabled}>{this.state.name}</button>
            )
        }

        return (
            <button type="submit" id={this.state.id} for={this.state.for} disabled={this.state.disabled}>{this.state.name}</button>
        )
    }
}

export default Redirect;
export { Toggle, Password, Text, ArrayTextList, Submit };