import React from 'react';

import firebase from '../../firebase';

import { clearTag } from '../../actions'
import { connect } from 'react-redux';
import { Segment, Button, Modal, Icon } from 'semantic-ui-react';

class DashboardOptions extends React.Component {
    state = {
        currentTag: this.props.currentTag,
        monitoredTagsRef: firebase.database().ref('monitoredTags'),
        deleteModal: false,
        deletingItem: false,
        resetModal: false,
        emptyTags: true

    }

    openDeleteModal = () => this.setState({deleteModal: true});

    closeDeleteModal = () => this.setState({deleteModal: false});

    openResetModal = () => this.setState({resetModal: true});

    closeResetModal = () => this.setState({resetModal: false});
    

    handleDelete = event => {
        event.preventDefault();

        this.setState({
            deletingItem: true
        }, () => {
            this.deleteTag();
        });
        
    }

    deleteTag = () => {
        const { monitoredTagsRef, currentTag } = this.state;

        monitoredTagsRef.child(currentTag.tagId).remove()
        .then(() =>{
            this.props.clearTag();
            this.setState({
                deletingItem: false
            });
            this.closeDeleteModal();
            console.log('Tag Deleted!');
            
        })
        .catch(err => {
            console.log(err);
        })
            
        
    }

    render(){
        const { resetModal, deleteModal } = this.state;

        return(
            <React.Fragment>
                <Segment>
                    <Button.Group icon widths="2">
                        <Button
                            onClick={this.openResetModal}
                            color="grey"
                            content="Reset Tag"
                            labelPosition="left"
                            icon="repeat"
                        ></Button>
                        <Button
                            onClick={this.openDeleteModal}
                            color="red"
                            content="Delete Tag"
                            labelPosition="right"
                            icon="delete"
                        ></Button>
                    </Button.Group>
                </Segment>

                <Modal basic open={deleteModal} onClose={this.closeDeleteModal}>
                <Modal.Header>Delete Tag</Modal.Header>
                <Modal.Content>
                   <h3>Are you sure you want to delete this tag?</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" inverted onClick={this.handleDelete}>
                        <Icon name="checkmark" /> Confirm Delete
                    </Button>
                    <Button color="grey" inverted  onClick={this.closeDeleteModal}>
                        <Icon name="remove"/> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal basic open={resetModal} onClose={this.closeResetModal}>
                <Modal.Header>Reset Tag</Modal.Header>
                <Modal.Content>
                    <h3>Are you sure you want to reset monitoring duration?</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        onClick={console.log('reset')}
                        color="green"
                        inverted
                    >
                    <Icon name="checkmark" /> Reset
                    </Button>
                    <Button 
                        color="grey"
                        inverted
                        onClick={this.closeResetModal}
                    >
                    <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>

        
        
        </React.Fragment>
        )    
     }
}

export default connect(null, { clearTag })(DashboardOptions);