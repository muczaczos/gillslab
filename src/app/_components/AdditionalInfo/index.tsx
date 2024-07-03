import React from 'react'

import classes from './index.module.scss'

const AdditionalInfo = ({ setAdditionalInfo }) => {
  const handleChange = event => {
    // console.log(event.target.value)
    setAdditionalInfo(event.target.value)
  }

  return (
    <div className={classes.section}>
      <h3 className={classes.title}> Additional Information </h3>
      <textarea
        className={classes.textArea}
        onChange={handleChange}
        name="postContent"
        rows={4}
        cols={40}
      />
    </div>
  )
}

export default AdditionalInfo
