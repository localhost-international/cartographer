import React from 'react'
import styled from 'styled-components/native'

export default function Test() {
  return (
    <TestView>
      <Text>Testing, testing, 1, 2, 3</Text>
    </TestView>
  )
}

const TestView = styled.View`
  background-color: rgba(255, 0, 0, 0.25);
`
const Text = styled.Text`
  color: red;
`
