const Post = ({ title, description, image }) => {
  return (
    <div className='post'>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className='post__image'
      ></div>
      <div className='post__info'>
        <h2 className='post__title'>{title}</h2>
        <p className='post__description'>{description}</p>
      </div>
    </div>
  )
}

export default Post
