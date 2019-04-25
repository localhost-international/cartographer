import React, { Component, createContext } from 'react';

const urls = [
  'https://status.hauntedthemes.com',
  'https://dontsharethis.b-ndstore.com/',
  'http://duck.com/',
];

const Context = createContext({
  urlCurrent: '',
  urlUpdate: () => { },
});

export class Provider extends Component {
  urlUpdate = urlNew => {
    this.setState({ urlCurrent: urlNew })
  };
  state = {
    urlCurrent: urls[0],
    urlUpdate: this.urlUpdate,
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
};

export const Consumer = Context.Consumer;