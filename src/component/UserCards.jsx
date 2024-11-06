import React from 'react'
import { Link } from 'react-router-dom'

const UserCards = () => {
    
    const otherDataUsers = [
        {
            title: 'Business Pending Approval',
            icon:'📰',
            bgColor: '#fff',
            path:'/user-pending',
            line: 'none'
            
        },
        {
            title: 'Manage Business',
            icon:'📄',
            bgColor: '#fff',
            path:'/user-all',
            line: 'none'
        },
        {
            title: 'Add New Business',
            icon:'🏢',
            bgColor: '#fff',
            path:'/user-add',
            line: 'none'
        },
    
    ]


  return (
    <div>
        <div className='other-data-users'>
            {otherDataUsers.map((card, index)=>(
            <Link className="user-card" key={index} to={card.path} style={{ backgroundColor: card.bgColor, width: card.width, textDecorationLine: card.line}}>
                <div className="card-icon-user">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.value}</p>
            </Link>
            ))}
        </div>
    </div>
  )
}

export default UserCards