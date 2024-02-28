import React, {Fragment} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {country} from '../../styles/main.style';
import {useDispatch} from 'react-redux';
import {APPOINTMENTS_OPTIONS} from '../../assets/constants';
import {WellAvailableFilterItem} from '../molecules/WellAvailableFilterItem';
import {setStatusSelectedAction} from '../../redux/appointments';
import {wp} from '../../assets/utils/helperResponsive';

export const RdvFilterList = () => {
  //
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(0);

  const onPress = (item, index) => {
    setActive(index);
    dispatch(setStatusSelectedAction(item?.key));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={APPOINTMENTS_OPTIONS}
        renderItem={({item, index}) => (
          <Fragment key={index}>
            <WellAvailableFilterItem
              item={item}
              active={active === index}
              onPress={() => onPress(item, index)}
              width={wp('33')}
            />
          </Fragment>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: country,
  },
  flatlist: {
    width: '100%',
    height: 'auto',
  },
});
