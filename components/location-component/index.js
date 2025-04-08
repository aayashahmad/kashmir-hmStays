import React from 'react'

import classNames from 'classnames'

import classes from './location-item.module.less'

const LocationItem = ({item }) => {
  return (
    <div className={classes.location_item_parent}>
    <div
      className={classNames(classes.location_item_title)}
      dangerouslySetInnerHTML={{ __html: item.name }}
    ></div>

    <div
      className={classNames(classes.location_item_desc)}
      dangerouslySetInnerHTML={{
        __html: item.description.split(".")[0],
      }}
    ></div>
  </div>
  )
}

export default LocationItem