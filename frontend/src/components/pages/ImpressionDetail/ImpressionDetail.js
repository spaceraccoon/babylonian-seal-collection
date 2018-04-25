import React, { Component, Fragment } from 'react';
import { Button, Popconfirm, Spin } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import CharDetail from '../../common/CharDetail/CharDetail';
import TagsDetail from '../../common/TagsDetail/TagsDetail';
import NestedItemsDetail from '../../common/NestedItemsDetail/NestedItemsDetail';
import {
  textFields,
  imageFields,
  historicalRelationshipFields,
} from '../../../data/itemFields';
import { fetchResource, deleteResource } from '../../../api/resourceApi';
import './ImpressionDetail.css';

class ImpressionList extends Component {
  state = {
    isLoading: true,
    redirect: false,
    impression: {},
  };

  async componentDidMount() {
    this.setState({
      impression: await fetchResource(this.props.match.params.id, 'impression'),
      isLoading: false,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/impression" />;
    }
    return (
      <Spin spinning={this.state.isLoading}>
        <div className="content-body">
          <h1 style={{ display: 'inline-block' }}>
            {this.state.impression.name}
          </h1>
          {this.state.impression.can_edit && (
            <Fragment>
              <Link
                to={{
                  pathname: `/impression/${this.state.impression.id}/edit`,
                  state: { from: this.props.location },
                }}
              >
                <Button type="primary" className="impression-detail__button">
                  Edit
                </Button>
              </Link>
              <Popconfirm
                title="Are you sure？"
                onConfirm={async () => {
                  if (
                    await deleteResource(this.state.impression.id, 'impression')
                  ) {
                    this.setState({
                      redirect: true,
                    });
                  }
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
            </Fragment>
          )}

          <h2>Metadata</h2>
          <CharDetail
            label="Created at"
            value={this.state.impression.created_at}
            time
          />
          <CharDetail
            label="Created by"
            value={this.state.impression.creator_username}
          />
          <CharDetail
            label="Updated at"
            value={this.state.impression.updated_at}
            time
          />
          <h2>Identification</h2>
          <CharDetail
            label="CDLI Number"
            value={this.state.impression.cdli_number}
          />
          <CharDetail label="P Number" value={this.state.impression.p_number} />
          <CharDetail
            label="Museum Number"
            value={this.state.impression.museum_number}
          />
          <CharDetail
            label="Accession Number"
            value={this.state.impression.accession_number}
          />
          <CharDetail
            label="Publication Number"
            value={this.state.impression.publication_number}
          />
          <CharDetail
            label="Collection"
            value={this.state.impression.collection}
          />
          <h2>Relationships</h2>
          <TagsDetail
            label="Created from Seals"
            link="seal"
            values={this.state.impression.seals}
          />
          <h2>Physical</h2>
          <CharDetail
            label="Length (mm)"
            value={this.state.impression.length}
          />
          <CharDetail
            label="Thickness (mm)"
            value={this.state.impression.thickness}
          />
          <CharDetail label="Width (mm)" value={this.state.impression.width} />
          <CharDetail label="Weight (g)" value={this.state.impression.weight} />
          <TagsDetail
            label="Materials"
            values={this.state.impression.materials}
          />
          <CharDetail
            label="Surface Preservation"
            value={this.state.impression.surface_preservation_text}
          />
          <CharDetail
            label="Condition"
            value={this.state.impression.condition}
          />
          <TagsDetail
            label="Object Types"
            values={this.state.impression.object_types}
          />
          <CharDetail
            label="Physical Remarks"
            value={this.state.impression.physical_remarks}
          />
          <h2>Origin</h2>
          <TagsDetail label="Periods" values={this.state.impression.periods} />
          <CharDetail
            label="Provenance"
            value={this.state.impression.provenance}
          />
          <CharDetail
            label="Provenance Remarks"
            value={this.state.impression.provenance_remarks}
          />
          <CharDetail
            label="Excavation Number"
            value={this.state.impression.excavation_number}
          />
          <h2>Content</h2>
          <TagsDetail
            label="Languages"
            values={this.state.impression.languages}
          />
          <NestedItemsDetail
            label="Historical Relationships"
            values={this.state.impression.historical_relationships}
            nestedItemLabel="historical_person.name"
            itemDetails={historicalRelationshipFields}
          />
          <NestedItemsDetail
            label="Texts"
            values={this.state.impression.texts}
            nestedItemLabel="title"
            itemDetails={textFields}
          />
          <h2>Uploads</h2>
          <NestedItemsDetail
            label="Images"
            values={this.state.impression.images}
            nestedItemLabel="name"
            itemDetails={imageFields}
          />
        </div>
      </Spin>
    );
  }
}

export default ImpressionList;
