import './index.css'

const TabsList = props => {
  const {eachTabItem, isTabActive, toggleTab} = props

  const {tabId, displayText} = eachTabItem

  const changeTabId = () => {
    toggleTab(tabId)
  }

  const activeTabStyling = isTabActive ? 'active-tab' : ''
  return (
    <li>
      <button
        className={`tab-button ${activeTabStyling}`}
        onClick={changeTabId}
        type="button"
      >
        <p>{displayText}</p>
      </button>
    </li>
  )
}

export default TabsList
