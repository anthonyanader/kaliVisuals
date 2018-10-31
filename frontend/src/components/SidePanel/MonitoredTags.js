import React from 'react';

import firebase from '../../firebase';

import { Menu, Icon, Form, Button, Input, Modal } from 'semantic-ui-react';

class MonitoredTags extends React.Component {
    state = {
        user: this.props.currentUser,
        monitoredTags: [],
        tagName: '',
        tagDuration: '',
        monitoredTagsRef: firebase.database().ref('monitoredTags'),
        modal: false
    }

    componentDidMount(){
        this.addListeners();
    }

    closeModal = () => this.setState({ modal: false })
    
    openModal = () => this.setState({ modal: true })

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()

        if(this.isFormValid(this.state)) {
            this.addTag()
        }
    }

    isFormValid = ({ tagName, tagDuration }) => tagName && tagDuration

    addTag = () => {
        const { monitoredTagsRef, tagName, tagDuration, user } = this.state

        const key = monitoredTagsRef.push().key

        const newTag = {
            tagId: key,
            tagName: tagName,
            tagDuration: tagDuration,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        monitoredTagsRef.child(key).update(newTag)
            .then(() =>{
                this.setState({ tagName: '', tagDuration: ''})
                this.closeModal()
                console.log('Tag Added!')
            })
            .catch(err => {
                console.log(err)
            })
    }

    addListeners = () => {
        let loadedTags = []
        this.state.monitoredTagsRef.on('child_added', snapshot => {
            loadedTags.push(snapshot.val())
            this.setState({ monitoredTags: loadedTags })
        })
    }

    displayTags = monitoredTags => (
        monitoredTags.length > 0 && monitoredTags.map(tag => (
            <Menu.Item
                key={tag.tagId}
                onClick={() => console.log(tag)}
                name={tag.tagName}
                style={{opacity: '0.7'}}
            >#{tag.tagName}
            </Menu.Item>
        ))
    )

    render() {

        const { monitoredTags, modal } = this.state

        return(
            <React.Fragment>
                <Menu.Menu style={{ paddingBottom: '2em' }}>
                    <Menu.Item>
                        <span>
                            <Icon name="tags"/>TAGS
                        </span>{" "}
                        ({ monitoredTags.length }) <Icon name="add" onClick={ this.openModal }/>
                    </Menu.Item>
                    {this.displayTags(monitoredTags)}
                </Menu.Menu>

                <Modal basic open={ modal } onClose={ this.closeModal }>
                    <Modal.Header>Add Tag</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input 
                                    fluid
                                    label="Tag Name"
                                    placeholder="GlobalWarming2018"
                                    name="tagName"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input 
                                    fluid
                                    label="Duration"
                                    placeholder="Enter duration in days"
                                    name="tagDuration"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSubmit}>
                            <Icon name="checkmark" /> Add
                        </Button>
                        <Button color="red" inverted  onClick={ this.closeModal }>
                            <Icon name="remove"/> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}

export default MonitoredTags;