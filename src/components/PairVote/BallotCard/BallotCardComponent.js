import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { breakPoint } from 'components/common/common.style'

const imgHeight = 250;
const imgHeightMobile = 175;
const minHeight = imgHeight + 80;
const maxWidth = imgHeight + 150;
const minHeightMobile = imgHeightMobile + 40;
const BallotCard = styled(Card)`
  display: flex;
  min-height: ${minHeight}px;
  width: ${maxWidth}px;
  border-radius: .5rem;

  h2 {
    padding: 0 1rem;
    overflow: ellipsis;
  }

  ${breakPoint.mediumAndSmaller} {
    min-height: ${minHeightMobile}px;
    min-width: ${minHeightMobile}px;
    width: 90%;
  }
`;

const BallotCardMedia = styled(CardMedia)`
  object-fit: scale-down;
  max-height: ${imgHeight}px;

  ${breakPoint.mediumAndSmaller} {
    height: ${imgHeightMobile}px;
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
          <BallotCardMedia
            component="img"
            alt={title}
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
