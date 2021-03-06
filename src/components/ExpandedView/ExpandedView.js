import React, { Component } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

import './ExpandedView.css'
import UpdateForm from '../UpdateForm/UpdateForm'
import axios from 'axios'
import API from '../../assets/ExpressURL'

export default class ExpandedView extends Component {
  state = {
    modalOpen: false
  }

  openEditModal = () => {
    this.props.closeModal()
  }

  openUpdateForm = () => {
    this.setState({
      modalOpen: true
    })
  }

  closeForm = () => {
    this.setState({
      modalOpen: false
    })
  }

  handleDelete = () => {
    this.props.closeModal()
    let deleteAPI = `${API}/${this.props.barber._id}`
    axios.delete(deleteAPI)
  }

  closePreviousForm = () => {
    this.closeForm()
    this.props.closeModal()
  }

  render = () => {
    let mapKey = 'AIzaSyAe_2Yi4B4N3WH9Wj3HA2XnLugNyhMLSpg'
    let search = `//www.google.com/maps/embed/v1/place?q=${this.props.barber.address.replace(
      / /g,
      '%20'
    )}
    ${this.props.barber.city},${this.props.barber.state},${this.props.barber
      .postalcode}
    &zoom=17 &key=${mapKey}`
    return (
      <Modal
        closeOnDimmerClick={true}
        closeOnDocumentClick={true}
        open={this.props.expandoOpen}
        dimmer={'blurring'}
        size="small"
      >
        <Modal.Header>
          {this.props.barber.name}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>
              {this.props.barber.rating}
            </Header>
            <p>
              {this.props.barber.phone}
            </p>
            <p>
              {this.props.barber.website}
            </p>
            <p>
              {this.props.barber.address}
            </p>
            {this.props.barber.reviews.map((item, idx) => {
              return (
                <p key={idx}>
                  {item.text}
                </p>
              )
            })}
            <div className="map">
              <iFrame src={search} width="500" height="325" />
            </div>
          </Modal.Description>
          <Modal.Actions>
            <Button type="button" onClick={this.props.closeModal}>
              Close
            </Button>
            <Button type="button" onClick={this.openUpdateForm}>
              Update
            </Button>
            <Button type="button" color="red" onClick={this.handleDelete}>
              Delete
            </Button>
          </Modal.Actions>
        </Modal.Content>
        <UpdateForm
          {...this.props}
          modalOpen={this.state.modalOpen}
          closeForm={this.closeForm}
          closePreviousForm={this.closePreviousForm}
        />
      </Modal>
    )
  }
}
