import React, { Component } from 'react';

class App extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await fetch('/nutzer/all');
    const body = await response.json();
    this.setState({users: body});
  }

  render() {
    const {users} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <div className="App-intro">
              <h2>Users</h2>
              {users.map(user =>
                  <div key={user.nutzerid}>
                    {user.benutzername} ({user.passwort})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}
export default App;
