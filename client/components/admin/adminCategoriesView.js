import React from 'react';
import { Header, Button, Segment, Divider } from 'semantic-ui-react';

const capitalize = (string) => (
  `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`
)


const DetailView = (props) => {
  return (
    <Segment>
      <Header as='h4'>{capitalize(props.category.name)}</Header>
      <Segment attached>
      <Button floated="right" color="teal" >Edit Category</Button>
      <Divider clearing hidden />
      </Segment>
    </Segment>
  )
}


const AdminCategoriesView = props => {
  const { categories } = props;
  return (
    <div>
      <Segment padded >
          <h2>Categories</h2>
        {categories && categories.map( category => (
          <DetailView category={category} key={category.id} />
        ))}
        </Segment>
    </div>
  );
};

export default AdminCategoriesView;
