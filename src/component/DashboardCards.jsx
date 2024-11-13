import React from 'react';
import '../assets/dashboard.css'
import { Link } from 'react-router-dom';

const DashboardCards = () => {
  const cardsData = [
        {
          title: 'Total Users',
          value: 1200,
          icon: '👥',
          bgColor: 'rgb(66, 204, 44)',
        },
        {
          title: 'Total Businesses',
          value: 300,
          icon: '🏢',
          bgColor: 'rgb(56, 200, 106)',
          
        },
      ];
    
      const otherData = [
        {
          title: 'Business Pending Approval',
          icon:'📰',
          bgColor: '#fff',
          path:'/admin/pending-businesses',
          line: 'none'
          
        },
        {
          title: 'Manage Business',
          icon:'📄',
          bgColor: '#fff',
          path:'/admin/all-businesses',
          line: 'none'
        },
        {
          title: 'Add New Business',
          icon:'🏢',
          bgColor: '#fff',
          path:'/admin/add-business',
          line: 'none'
        },
        {
          title: 'Manage User',
          icon:'🔗',
          bgColor: '#fff',
          path:'/admin/all-users',
          line: 'none'
          
        }
      
      ]

  return (
    <div>
      <div className="dashboard-cards">
        {cardsData.map((card, index) => (
          <div className="card" key={index} style={{ backgroundColor: card.bgColor, width: card.width}}>
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      <div className='other-data'>
        {otherData.map((card, index)=>(
          <Link className="card" key={index} to={card.path} style={{ backgroundColor: card.bgColor, width: card.width, textDecorationLine: card.line}}>
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;

