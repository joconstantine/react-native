import React from 'react';
import { SvgXml } from 'react-native-svg';

import { Spacer } from '../../../components/spacers/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { Favourite } from '../../../components/favourites/favourite.component';
import star from '../../../../assets/star';
import open from '../../../../assets/open';
import {
  RestaurantCard,
  RestaurantCardCover,
  SectionEnd,
  Section,
  Rating,
  Info,
  Icon,
  Address,
  Open,
} from './restaurant-info.styles';

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = 'Some Restaurant',
    icon = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    photos = [
      'https://media-cdn.tripadvisor.com/media/photo-s/1a/b8/46/6d/london-stock.jpg',
    ],
    address = '100 some random street',
    isOpenNow = true,
    rating = 3.2,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.ceil(rating)));

  return (
    <RestaurantCard elevation={5}>
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <Open xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
