import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import GuitarEdit from '../GuitarEdit';

export default function GuitarList(props) {
  return (
    <Card.Group className="ui four stackable cards">
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
                    <Button 
                      basic 
                      color='green'
                      onClick={ () => props.onEdit(guitar.id) }
                    >
                      Edit
                    </Button>
                    <Button 
                      basic 
                      color='red' 
                      onClick={ () => props.onDelete(guitar.id) }
                    >
                      Delete
                    </Button>
                  </div>
                  { guitar.edit 
                    && 
                    <GuitarEdit
                      name={guitar.name} i
                      isElectric={guitar.is_electric} 
                      price={guitar.price}
                      onEdit={props.onSubmit}
                      id={guitar.id}
                    /> 
                  }
                </Card.Content>
              </Card>
            )
        })
      }
    </Card.Group>
  )
}