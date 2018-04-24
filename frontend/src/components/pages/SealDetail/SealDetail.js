import React, { Component, Fragment } from 'react';
import { Button, Popconfirm, Spin } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import CharDetail from '../../common/CharDetail/CharDetail';
import TagDetail from '../../common/TagDetail/TagDetail';
import TagsDetail from '../../common/TagsDetail/TagsDetail';
import NestedItemsDetail from '../../common/NestedItemsDetail/NestedItemsDetail';
import {
  publicationFields,
  textFields,
  imageFields,
  historicalRelationshipFields,
} from '../../../data/itemFields';
import { fetchResource, deleteResource } from '../../../api/resourceApi';
import './SealDetail.css';

class SealList extends Component {
  state = {
    isLoading: true,
    redirect: false,
    seal: {},
  };

  async componentDidMount() {
    this.setState({
      seal: await fetchResource(this.props.match.params.id, 'seal'),
      isLoading: false,
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Spin spinning={this.state.isLoading}>
        <div className="content-body">
          <h1 style={{ display: 'inline-block' }}>{this.state.seal.name}</h1>
          {this.state.seal.can_edit && (
            <Fragment>
              <Link
                to={{
                  pathname: `/seal/${this.state.seal.id}/edit`,
                  state: { from: this.props.location },
                }}
              >
                <Button type="primary" className="seal-detail__button">
                  Edit
                </Button>
              </Link>
              <Popconfirm
                title="Are you sure？"
                onConfirm={async () => {
                  if (await deleteResource(this.state.seal.id, 'seal')) {
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
            value={this.state.seal.created_at}
            time
          />
          <CharDetail
            label="Created by"
            value={this.state.seal.creator_username}
          />
          <CharDetail
            label="Updated at"
            value={this.state.seal.updated_at}
            time
          />
          <h2>Identification</h2>
          <CharDetail label="CDLI Number" value={this.state.seal.cdli_number} />
          <CharDetail
            label="Museum Number"
            value={this.state.seal.museum_number}
          />
          <CharDetail
            label="Accession Number"
            value={this.state.seal.accession_number}
          />
          <CharDetail
            label="Publication Number"
            value={this.state.seal.publication_number}
          />
          <CharDetail label="Collection" value={this.state.seal.collection} />
          <h2>Physical</h2>
          <CharDetail label="Height (mm)" value={this.state.seal.height} />
          <CharDetail
            label="Thickness (mm)"
            value={this.state.seal.thickness}
          />
          <CharDetail label="Width (mm)" value={this.state.seal.width} />
          <CharDetail label="Weight (g)" value={this.state.seal.weight} />
          <CharDetail
            label="Drill Hole Diameter (mm)"
            value={this.state.seal.drill_hole_diameter}
          />
          <CharDetail
            label="Perforations"
            value={this.state.seal.perforations}
          />
          <TagsDetail label="Materials" values={this.state.seal.materials} />
          <CharDetail
            label="Surface Preservation"
            value={this.state.seal.surface_preservation_text}
          />
          <CharDetail label="Condition" value={this.state.seal.condition} />
          <CharDetail
            label="Is Recarved"
            value={
              typeof this.state.seal.is_recarved === 'boolean'
                ? this.state.seal.is_recarved.toString()
                : null
            }
          />
          <TagDetail label="Object Type" value={this.state.seal.object_type} />
          <CharDetail
            label="Physical Remarks"
            value={this.state.seal.physical_remarks}
          />
          <h2>Origin</h2>
          <TagsDetail label="Periods" values={this.state.seal.periods} />
          <CharDetail label="Provenance" value={this.state.seal.provenance} />
          <CharDetail
            label="Provenance Remarks"
            value={this.state.seal.provenance_remarks}
          />
          <CharDetail
            label="Excavation Number"
            value={this.state.seal.excavation_number}
          />
          <h2>Content</h2>
          <TagsDetail label="Languages" values={this.state.seal.languages} />
          <NestedItemsDetail
            label="Historical Relationships"
            values={this.state.seal.historical_relationships}
            nestedItemLabel="historical_person.name"
            itemDetails={historicalRelationshipFields}
          />
          <NestedItemsDetail
            label="Texts"
            values={this.state.seal.texts}
            nestedItemLabel="title"
            itemDetails={textFields}
          />
          <h2>Design</h2>
          <CharDetail label="Design Type" value={this.state.seal.design_text} />
          <CharDetail
            label="Design Remarks"
            value={this.state.seal.design_remarks}
          />
          <TagsDetail label="Scenes" values={this.state.seal.scenes} />
          <TagsDetail label="Art Styles" values={this.state.seal.art_styles} />
          <TagsDetail
            label="Iconographic Elements"
            values={this.state.seal.iconographic_elements}
          />
          <h2>Uploads</h2>
          <NestedItemsDetail
            label="Images"
            values={this.state.seal.images}
            nestedItemLabel="name"
            itemDetails={imageFields}
          />
          <h2>Bibliography</h2>
          <NestedItemsDetail
            label="Publications"
            values={this.state.seal.publications}
            nestedItemLabel="title"
            itemDetails={publicationFields}
          />
        </div>
      </Spin>
    );
  }
}

export default SealList;
