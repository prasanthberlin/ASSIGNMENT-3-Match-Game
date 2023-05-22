import './index.css'

const ImagesList = props => {
  const {eachImageItem, imageClicked} = props

  const {imageUrl, thumbnailUrl} = eachImageItem

  const thumbnailImg = () => {
    imageClicked(imageUrl)
  }

  return (
    <li>
      <button type="button" onClick={thumbnailImg} className="image-button">
        <img src={thumbnailUrl} className="thumbnail-image" alt="thumbnail" />
      </button>
    </li>
  )
}

export default ImagesList
