import React from 'react'

export const CustomPublishButton = props => {
  const { DefaultButton, ...rest } = props
  return <DefaultButton {...rest} draft={true} label="Save & Publish" />
}
