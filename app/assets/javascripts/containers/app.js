import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import QueueMusicIcon from 'material-ui/svg-icons/av/queue-music'
import Divider from 'material-ui/Divider'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import LinearProgress from 'material-ui/LinearProgress';

import AddModal from 'components/add'

//Added stuff for Chip
import { darken, fade, emphasize, lighten } from 'material-ui/utils/colorManipulator'
import typography from 'material-ui/styles/typography'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

const { palette, fontFamily, spacing } = lightBaseTheme
const theme = getMuiTheme({
  chip: {
    backgroundColor: emphasize(palette.canvasColor, 0.12),
    deleteIconColor: fade(palette.textColor, 0.26),
    textColor: fade(palette.textColor, 0.87),
    fontSize: 14,
    fontWeight: typography.fontWeightNormal,
    shadow: `0 1px 6px ${fade(palette.shadowColor, 0.12)},
      0 1px 4px ${fade(palette.shadowColor, 0.12)}`,
  }
})

export class App extends Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.saveSong = this.saveSong.bind(this)
    this.state = { addModalOpen: false }
  }

  openModal() {
    this.setState({ addModalOpen: true })
  }

  closeModal() {
    this.setState({ addModalOpen: false })
  }

  saveSong() {
    this.closeModal()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <AppBar title="Songs Database"
            iconElementLeft={<IconButton><QueueMusicIcon /></IconButton>}
            iconElementRight={
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Refresh" leftIcon={<Refresh />} />
                <MenuItem primaryText="Add Song" leftIcon={<ContentAddCircle />} onTouchTap={this.openModal} />
                <Divider />
                <MenuItem primaryText="Sign out" leftIcon={<ExitToApp />}/>
              </IconMenu>
            }
          />
          <LinearProgress />
          <AddModal open={this.state.addModalOpen} onClose={this.closeModal} onSave={this.saveSong} />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(() => {return {}}, { })(App)
