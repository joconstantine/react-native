import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { RestaurantInfoCard } from '../components/restaurant-info-card.component';
import { Spacer } from '../../../components/spacers/spacer.component';
import { FavouritesBar } from '../../../components/favourites/favourites-bar.component';
import { RestaurantContext } from '../../../services/restaurants/restaurants.context';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { LocationsContext } from '../../../services/locations/locations.context';
import { Search } from '../components/search.component';
import { SafeArea } from '../../../components/utilities/safe-area.component';
import { RestaurantList } from '../components/restaurants-list.styles';
import { FadeInView } from '../../../components/animations/fade.animations';
import { Text } from '../../../components/typography/text.component';

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantScreen = ({ navigation }) => {
  const { errors: locationErrors } = useContext(LocationsContext);
  const {
    restaurants,
    isLoading,
    errors: restaurantErrors,
  } = useContext(RestaurantContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsTogged] = useState(false);
  const hasErrors = !!restaurantErrors || !!locationErrors;

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        setFavouritesToggle={() => setIsTogged(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}

      {hasErrors && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}
      {!hasErrors && (
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RestaurantDetail', { restaurant: item })
                }
              >
                <Spacer position="bottom" size="large">
                  <FadeInView>
                    <RestaurantInfoCard restaurant={item} />
                  </FadeInView>
                </Spacer>
              </TouchableOpacity>
            );
          }}
          key={(item) => item.name}
        />
      )}
    </SafeArea>
  );
};
