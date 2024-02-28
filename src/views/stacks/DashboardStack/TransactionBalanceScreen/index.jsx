import {View, StyleSheet, FlatList, ScrollView} from 'react-native';
import React from 'react';
import {AppHeader} from '../../../../components/headers/AppHeader';
import {useNavigation} from '@react-navigation/native';
import {THEME} from '../../../../styles/theme';
import {TextVariant} from '../../../../components/atoms/TextVariant';
import {hp} from '../../../../assets/utils/helperResponsive';
import {country, planet} from '../../../../styles/main.style';
import {
  useTransactionBalance,
  useTransactions,
} from '../../../../hooks/useTransactions';
import {useFormatedTrasactions} from '../../../../hooks/useFormatedTrasactions';
import {TransactionItemCard} from '../../../../components/molecules/TransactionItemCard';
import {LogoLoader} from '../../../../components/atoms/LogoLoader';

export const TransactionBalanceScreen = () => {
  //

  const navigation = useNavigation();
  const {data} = useTransactionBalance();
  const {data: data2, refetch, isLoading} = useTransactions();
  const {allTransactionsFormated} = useFormatedTrasactions(data2);

  const handleDetails = well => {
    navigation.navigate('WellDetails', {well: {id: well?.Bien?.id}});
  };

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title={'IMMOVER PRO'}
        titleColor={THEME.colors.primary}
        withLeftBtn={true}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.historiesList}>
        <View style={styles.content}>
          <View style={styles.sold}>
            <TextVariant
              text={'Solde non recouvertes'}
              variant={'h4'}
              textAlign={'center'}
              marginBottom={hp('2')}
              fontWeight={'bold'}
            />
            <TextVariant
              text={`${data?.solde || 0} Fcfa`}
              variant={'h2'}
              textAlign={'center'}
              color={THEME.colors.primary}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.historiesList}>
          <View>
            <FlatList
              data={allTransactionsFormated}
              renderItem={({item}) => (
                <>
                  <TextVariant
                    variant={'title4'}
                    text={item?.date}
                    marginLeft={planet}
                  />
                  <FlatList
                    data={item?.data || []}
                    scrollEnabled={false}
                    renderItem={({item}) => (
                      <TransactionItemCard
                        onPress={() => handleDetails(item)}
                        item={item}
                      />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    refetching={refetch}
                  />
                </>
              )}
              keyExtractor={item => item?.date}
              scrollEnabled={false}
              refreshing={refetch}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.darkLight2,
    paddingHorizontal: country,
  },
  content: {},
  sold: {
    marginTop: hp('1.2'),
    backgroundColor: THEME.colors.white,
    borderRadius: country,
    paddingVertical: hp('2'),
    marginBottom: hp('2'),
  },
});
