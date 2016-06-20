import React, { Component, PropTypes } from 'react'

import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import { Step, Stepper, StepLabel } from 'material-ui/Stepper'

import Chip from 'components/chip'

export default class Add extends Component {
  static propTypes = {
    onSave: PropTypes.func,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.state = this.initialState()
  }

  initialState() {
    return {
      finished: false,
      stepIndex: 0,
      tags: [{key: 0, label: '0'},{key: 1, label: '1'},{key: 2, label: '2'}]
    }
  }

  handleReset() {
    this.setState(this.initialState())
  }

  handleClose() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  handleSave() {
    if (this.props.onSave) {
      this.props.onSave()
    }
  }

  handleNext() {
    const {stepIndex} = this.state
    if (stepIndex == 2) return this.handleSave()
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    })
  }

  handlePrev() {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  removeTag(key) {
    const newTags = this.state.tags.slice()
    newTags.splice(newTags.map(tag => tag.key).indexOf(key), 1)
    this.setState({tags: newTags})
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.titleContent()
      case 1:
        return this.tagContent()
      case 2:
        return this.uploadContent()
    }
  }

  titleContent() {
    return (
      <div>
        <TextField
          hintText="Song Title (Required)"
          errorText="This field is required"
          fullWidth={true}
        />
        <TextField
          hintText="Lyrics (Optional)"
          fullWidth={true}
          multiLine={true}
          rowsMax={10}
        />
      </div>
    )
  }

  tagContent() {
    const self = this
    return (
      <div>
        {this.state.tags.map(tag => {
          return (
            <Chip
              key={tag.key}
              onRequestDelete={() => self.removeTag(tag.key)}
            >
              {tag.label}
            </Chip>
          )
        })}
      </div>
    )
  }

  uploadContent() {
    return (
      <div>
        <TextField
          hintText="Upload"
          fullWidth={true}
        />
      </div>
    )
  }

  render() {
    const {finished, stepIndex} = this.state

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Reset"
        secondary={true}
        onTouchTap={this.handleReset}
      />,
      <RaisedButton
        label={stepIndex === 2 ? 'Save' : 'Next'}
        primary={true}
        onTouchTap={this.handleNext}
      />
    ]

    return (
      <Dialog title="Add a song" actions={actions} modal={true} open={this.props.open} >
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Add a title and lyrics</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add tags</StepLabel>
          </Step>
          <Step>
            <StepLabel>Upload lead sheets</StepLabel>
          </Step>
        </Stepper>
        {this.getStepContent(stepIndex)}
      </Dialog>
    )
  }
}
