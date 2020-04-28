import React from 'react';
import { Card, Button } from 'semantic-ui-react';

export default function GuitarList(props) {
  return (
    <Card.Group>
      {
        props.guitars.map((guitar, key) => {
            return (
              <Card 
                key={key}
                color={ guitar.is_electric ? "yellow" : "purple"}
              >
                <Card.Content>
                  <Card.Header>{guitar.name}</Card.Header>
                  <Card.Meta>${guitar.price}</Card.Meta>
                  <Card.Description>
                    { guitar.is_electric ? "It can be electric" : "It is not electric" }
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Edit
                    </Button>
                    <Button 
                      basic color='red' 
                      onClick={ () => props.onDelete(guitar.id) }
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            )
        })
      }
    </Card.Group>
  )
}