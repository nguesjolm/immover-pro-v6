import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
} from 'react-native-reanimated';
import RenderItem from '../../../components/atoms/RenderItem';
import data from '../../../assets/data';
import CustomButton from '../../../components/atoms/OnboardButton';
import Pagination from '../../../components/atoms/Pagination';
import {SignInContext} from '../../../contexts/authContext';
import {Storage} from '../../../assets/services/storage.service';

const OnboardingScreen = () => {
  //
  const {setIsConnect} = useContext(SignInContext);

  const flatListRef = useAnimatedRef();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const viewabilityConfig = {
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 10,
  };

  const onViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  // CHECK IF USER IS CONNECTED
  useEffect(() => {
    (async () => {
      const token = await Storage.getItem('token');
      const _token_ = JSON.parse(token);
      setIsConnect(_token_ !== null ? true : false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({item, index}) => {
          return <RenderItem item={item} index={index} x={x} />;
        }}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingVertical: 30,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});
