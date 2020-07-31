import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  count: 0,
  urlInput: 'http://duck.com/',
  urlCurrent: 'https://duck.com/'
};

export const { setGlobalState, useGlobalState } = createGlobalState(initialState);


export const onChangeText = (urlInput: string) => {
  console.log('onChangeText', urlInput);
  setGlobalState('urlInput', urlInput);
};


export const onSubmitEditing = (event: any) => { 
  console.log('onSubmitEditing', event.nativeEvent.text); 
  setGlobalState('urlCurrent', event.nativeEvent.text);
};
export const onFocus = () => { console.log('onFocus'); };
export const onBlur = () => { console.log('onBlur'); };