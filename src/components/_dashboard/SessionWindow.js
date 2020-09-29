import React, { Component } from 'react';

import { OTSession, OTStreams, preloadScript } from 'opentok-react'
import ConnectionStatus from './ConnectionStatus';
import Publisher from './Publisher';
import Subscriber from './Subscriber';

class SessionWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connected: false
    };

    this.sessionEvents = {
      sessionConnected: () => {
        this.setState({ connected: true });
      },
      sessionDisconnected: () => {
        this.setState({ connected: false });
      }
    };
  }

  componentWillMount() {

  }

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  }

  render() {
    return (
      <OTSession
        apiKey={this.props.apiKey}
        sessionId={this.props.sessionId}
        token={this.props.token}
        eventHandlers={this.sessionEvents}
        onError={this.onError}
      >
        {this.state.error ? <div>{this.state.error}</div> : null}
        <ConnectionStatus connected={this.state.connected} />
        <Publisher />
        <OTStreams>
          <Subscriber />
        </OTStreams>
      </OTSession>
    );
  }
}

export default preloadScript(SessionWindow);
