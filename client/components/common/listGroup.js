import React from 'react'

const ListGroup = ({ items, selectedItem, name, onItemSelect }) => {
  return <>
    <ul className="list-group">
      { items.map((item, i) => {
        return <li onClick={() => onItemSelect(item[name])} key={i}
          className={ item[name] === selectedItem ? 'list-group-item active' : 'list-group-item' }
        >{item[name]}</li>
      } )}
    </ul>
  </>
}

export default ListGroup