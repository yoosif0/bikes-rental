import React from 'react'
import { toast } from 'react-toastify';
import { ToastUndo } from './UndoToast';



export class UndoDelete extends React.Component {

    state = {
        toRemove: []
    };

    cleanCollection = () => {
        this.state.toRemove.forEach(x => this.props.deletedPermanently(x))
    }

    onDeleteClick = item => {
        this.setState({ toRemove: [...this.state.toRemove, item._id] });
        this.notify(item._id, item.name || item.model)
    };

    notify = (id, label) => toast(<ToastUndo timeout={800} label={label} removeTemp={this.removeTemp} id={id} />, { onClose: this.cleanCollection });

    removeTemp = id => this.setState({ toRemove: this.state.toRemove.filter(v => v !== id) });

    _filteredArr() {
        return this.props.items.filter(item => !this.state.toRemove.includes(item._id))
    }

    render() {
        return (
            this.props.children(this._filteredArr(), this.onDeleteClick)
        );
    }
}
