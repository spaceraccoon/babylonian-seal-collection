import React, { Component, Fragment } from 'react';
import { Button, Popconfirm, Tag } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';

import { fetchSeal, deleteSeal } from '../../../api/sealApi';
import stringToColor from '../../../utils/stringToColor';

class SealList extends Component {
  state = {
    redirect: false,
    seal: {},
  };

  async componentDidMount() {
    this.setState({
      seal: await fetchSeal(this.props.match.params.id),
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="content-body">
        <h1 style={{ display: 'inline-block' }}>{this.state.seal.name}</h1>
        {this.state.seal.can_edit && (
          <Fragment>
            <Link to={`/seal/${this.state.seal.id}/edit`}>
              <Button type="primary" style={{ margin: '0 4px 0 24px' }}>
                Edit
              </Button>
            </Link>
            <Popconfirm
              title="Are you sure？"
              onConfirm={async () => {
                if (await deleteSeal(this.state.seal.id)) {
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
        <ul>
          <li>
            <strong>Created at: </strong>
            <Moment date={this.state.seal.created_at} />
          </li>
          <li>
            <strong>Created by: </strong>
            {this.state.seal.creator_username}
          </li>
          <li>
            <strong>Updated at: </strong>
            <Moment date={this.state.seal.updated_at} />
          </li>
        </ul>
        <h2>Identification</h2>
        <ul>
          <li>
            <strong>CDLI Number: </strong>
            {this.state.seal.cdli_number}
          </li>
          <li>
            <strong>Museum Number: </strong>
            {this.state.seal.museum_number}
          </li>
          <li>
            <strong>Accession Number: </strong>
            {this.state.seal.accession_number}
          </li>
          <li>
            <strong>Publication Number: </strong>
            {this.state.seal.publication_number}
          </li>
          <li>
            <strong>Collection: </strong>
            {this.state.seal.collection}
          </li>
        </ul>
        <h2>Physical</h2>
        <ul>
          <li>
            <strong>Height (mm): </strong>
            {this.state.seal.height}
          </li>
          <li>
            <strong>Thickness (mm): </strong>
            {this.state.seal.thickness}
          </li>
          <li>
            <strong>Width (mm): </strong>
            {this.state.seal.width}
          </li>
          <li>
            <strong>Weight (g): </strong>
            {this.state.seal.weight}
          </li>
          <li>
            <strong>Drill Hole Diameter (mm): </strong>
            {this.state.seal.drill_hole_diameter}
          </li>
          <li>
            <strong>Perforations: </strong>
            {this.state.seal.perforations}
          </li>
          <li>
            <strong>Materials: </strong>
            {this.state.seal.materials &&
              this.state.seal.materials.map(material => (
                <Tag color={stringToColor(material.name)} key={material.id}>
                  {material.name}
                </Tag>
              ))}
          </li>
          <li>
            <strong>Surface Preservation: </strong>
            {this.state.seal.surface_preservation_text}
          </li>
          <li>
            <strong>Condition: </strong>
            {this.state.seal.condition}
          </li>
          <li>
            <strong>Is Recarved: </strong>
            {this.state.seal.is_recarved &&
              this.state.seal.is_recarved.toString()}
          </li>
          <li>
            <strong>Physical Remarks: </strong>
            {this.state.seal.physical_remarks}
          </li>
        </ul>
        <h2>Origin</h2>
        <ul>
          <li>
            <strong>Periods: </strong>
            {this.state.seal.periods &&
              this.state.seal.periods.map(period => (
                <Tag color={stringToColor(period.name)} key={period.id}>
                  {period.name}
                </Tag>
              ))}
          </li>
          <li>
            <strong>Provenance: </strong>
            {this.state.seal.provenance}
          </li>
          <li>
            <strong>Provenance Remarks: </strong>
            {this.state.seal.provenance_remarks}
          </li>
          <li>
            <strong>Excavation Number: </strong>
            {this.state.seal.excavation_number}
          </li>
        </ul>
        <h2>Design</h2>
        <ul>
          <li>
            <strong>Design Type: </strong>
            {this.state.seal.design_text}
          </li>
          <li>
            <strong>Design Remarks: </strong>
            {this.state.seal.design_remarks}
          </li>
          <li>
            <strong>Scenes: </strong>
            {this.state.seal.scenes &&
              this.state.seal.scenes.map(scene => (
                <Tag color={stringToColor(scene.name)} key={scene.id}>
                  {scene.name}
                </Tag>
              ))}
          </li>
          <li>
            <strong>Art Styles: </strong>
            {this.state.seal.art_styles &&
              this.state.seal.art_styles.map(art_style => (
                <Tag color={stringToColor(art_style.name)} key={art_style.id}>
                  {art_style.name}
                </Tag>
              ))}
          </li>
          <li>
            <strong>Iconographic Elements: </strong>
            {this.state.seal.iconographic_elements &&
              this.state.seal.iconographic_elements.map(
                iconographic_element => (
                  <Tag
                    color={stringToColor(iconographic_element.name)}
                    key={iconographic_element.id}
                  >
                    {iconographic_element.name}
                  </Tag>
                )
              )}
          </li>
        </ul>
      </div>
    );
  }
}

export default SealList;
