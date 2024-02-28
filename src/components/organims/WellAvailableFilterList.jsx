import React, {Fragment} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {WELL_OPTIONS} from '../../assets/constants';
import {WellAvailableFilterItem} from '../molecules/WellAvailableFilterItem';
import {useDispatch} from 'react-redux';
import {setStatusSelectedAction} from '../../redux/wells';

export const WellAvailableFilterList = () => {
  //
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(0);

  const onPress = (item, index) => {
    setActive(index);
    dispatch(setStatusSelectedAction(item?.key));
  };

  return (
    <View style={{width: '100%'}}>
      <ScrollView
        contentContainerStyle={styles.flatlist}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {WELL_OPTIONS?.map((item, index) => {
          return (
            <Fragment key={index}>
              <WellAvailableFilterItem
                item={item}
                active={active === index}
                onPress={() => onPress(item, index)}
              />
            </Fragment>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
    height: 'auto',
  },
});
