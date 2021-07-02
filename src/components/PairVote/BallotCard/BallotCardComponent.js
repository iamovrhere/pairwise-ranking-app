import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';

const imgHeight = 250;
const minHeight = imgHeight + 80;
const BallotCard = styled(Card)`
  display: flex;
  min-height: ${minHeight}px;
  min-width: ${minHeight}px;

  h2 {
    padding: 0 1rem;
    overflow: ellipsis;
  }
`;

/**
 * Creates a single ballot image card.
 * If there's no image, it'll just render the text is squarish card.
 *
 * @param {{
  img: null|string,
  title: string,
  onClick: Function
  * }} param0
 */
function BallotCardComponent({ img, title, onClick }) {
  return (
    <BallotCard raised={true}>
      <CardActionArea onClick={onClick}>
        {
          img &&
          <CardMedia
            component="img"
            alt={title}
            height={imgHeight}
            image={img}
            title={title}
          />
        }
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
      </CardActionArea>
    </BallotCard>
  );
}

BallotCardComponent.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BallotCardComponent;
