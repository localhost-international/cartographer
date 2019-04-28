import React, { Component, createContext } from 'react';

const urls = [
  'https://status.im',
  'https://dontsharethis.b-ndstore.com/',
  'http://duck.com/',
];

const Context = createContext({
  urlSource: '',
  urlNew: '',
  urlUpdate: () => { },
});

export class Provider extends Component {
  urlUpdate = urlNew => {
    this.setState({ urlSource: urlNew }); 
  };
  state = {
    urlSource: urls[0],
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