import React from 'react'

const LikeIcon = ({ song, handleLike }) => {

  return <>
  <i className={song.liked ? 'fa fa-heart' : 'fa fa-heart-o'} onClick={() => handleLike(song)}></i>
  </>
}

export default LikeIcon