import React from 'react';
import Link from 'next/link';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link href={`/programs?id=${props.id}`}>
          <a>
            <div className="user-item__image">
              <Avatar image={props.image} alt={props.name} />
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
              <h3>
                {props.programCount}{' '}
                {props.programCount === 1 ? 'Program' : 'Programs'}
              </h3>
            </div>
          </a>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
