import React, { Component } from 'react';

import firebase from '../../firebase';
import moment from 'moment';

import { Segment, Button, Modal, Icon } from 'semantic-ui-react';

class DashboardOptions extends Component {
  state = {
    currentTag: this.props.currentTag,
    monitoredTagsRef: firebase.database().ref('monitoredTags'),
    deleteModal: false,
    resetModal: false,
    resetingTag: false
  };

  openDeleteModal = () => this.setState({ deleteModal: true });

  closeDeleteModal = () => this.setState({ deleteModal: false });

  openResetModal = () => this.setState({ resetModal: true });

  closeResetModal = () => this.setState({ resetModal: false });

  disableOptionButtons = () => this.state.currentTag === null;

  removeListeners = () => {
    this.state.monitoredTagsRef.off();
  };

  handleDelete = event => {
    event.preventDefault();
    this.deleteTag();
  };

  deleteTag = () => {
    const { monitoredTagsRef, currentTag } = this.state;

    monitoredTagsRef
      .child(currentTag.tagId)
      .remove()
      .then(() => {
        this.closeDeleteModal();
        console.log('Tag Deleted!');
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleReset = event => {
    event.preventDefault();
    this.resetTag();
  };

  resetTag = () => {
    const { monitoredTagsRef, currentTag } = this.state;

    monitoredTagsRef
      .child(currentTag.tagId)
      .update({
        monitorEndDate: moment(currentTag.monitorEndDate)
          .add(currentTag.tagDuration, 'days')
          .format()
      })
      .then(() => {
        this.closeResetModal();
        console.log('Tag Reset!');
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { resetModal, deleteModal } = this.state;

    return (
      <React.Fragment>
        <Segment>
          <Button.Group icon widths='2'>
            <Button
              disabled={this.disableOptionButtons()}
              onClick={this.openResetModal}
              color='grey'
              content='Reset Tag'
              labelPosition='left'
              icon='repeat'
            ></Button>
            <Button
              disabled={this.disableOptionButtons()}
              onClick={this.openDeleteModal}
              color='red'
              content='Delete Tag'
              labelPosition='right'
              icon='delete'
            ></Button>
          </Button.Group>
        </Segment>

        <Modal basic open={deleteModal} onClose={this.closeDeleteModal}>
          <Modal.Header>Delete Tag</Modal.Header>
          <Modal.Content>
            <h3>Are you sure you want to delete this tag?</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={this.handleDelete}>
              <Icon name='checkmark' /> Confirm Delete
            </Button>
            <Button color='grey' inverted onClick={this.closeDeleteModal}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal basic open={resetModal} onClose={this.closeResetModal}>
          <Modal.Header>Reset Tag</Modal.Header>
          <Modal.Content>
            <h3>Are you sure you want to reset monitoring duration?</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.resetTag}>
              <Icon name='checkmark' /> Reset
            </Button>
            <Button color='grey' inverted onClick={this.closeResetModal}>
              <Icon name='remove' /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default DashboardOptions;
