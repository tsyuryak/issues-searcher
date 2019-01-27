import React from 'react'
import uniqid from 'uniqid'
import styles from './styles/items-changer-combo.module.css'

function ItemsChangerCombo({
  quantity,
  dropupVisible,
  changeQuantity,
  toggleCombo,
  baseUrl,
}) {
  const quantities = [5, 10, 20, 30, 50, 75, 100]
  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={e => toggleCombo(e)}
        className={styles['ui-combobox']}
        style={
          dropupVisible
            ? { color: 'rgb(21, 4, 173)', backgroundColor: 'white' }
            : null
        }
      >
        {quantity}
      </div>
      <ul
        className={styles['combo-items']}
        style={{ display: dropupVisible ? 'block' : 'none' }}
      >
        {quantities
          .filter(q => q !== +quantity)
          .map(q => (
            <li key={uniqid()}>
              <div onClick={e => changeQuantity(e, `${baseUrl}/${q}/1`)}>
                {q}
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ItemsChangerCombo
