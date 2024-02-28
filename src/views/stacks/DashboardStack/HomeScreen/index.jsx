import React from 'react';
import {THEME} from '../../../../styles/theme';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {DashbordHeader} from '../../../../components/headers/DashboadHeader';
import {hp, wp} from '../../../../assets/utils/helperResponsive';
import {DashboardCardContent} from '../../../../components/organims/DashboardCardContent';
import {BannerContent} from '../../../../components/organims/BannerContent';
import {NewWellItemList} from '../../../../components/organims/NewWellItemList';
import {useTotalTransactions} from '../../../../hooks/useTransactions';
import {useAppointmentsByStatus} from '../../../../hooks/useAppointments';
import {LogoLoader} from '../../../../components/atoms/LogoLoader';
import {useRequests} from '../../../../hooks/useRequests';
import {useRefreshData} from '../../../../hooks/useRefreshData';

export const HomeScreen = () => {
  //
  const {data, isLoading: isLoading2} = useTotalTransactions();
  const {data: newAppointments, isLoading} = useAppointmentsByStatus('waiting');
  const {data: requests, refetch, isLoading: isLoading3} = useRequests();
  const {isRefetchingByUser, refetchByUser} = useRefreshData(refetch);

  if (isLoading || isLoading2 || isLoading3) {
    return <LogoLoader bgcolor={THEME.colors.redLight} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DashbordHeader />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }>
        <View style={styles.topContent}>
          <BannerContent totalTransaction={data?.solde} />
        </View>
        <DashboardCardContent
          newAppointmentLength={newAppointments?.rdvData?.length}
        />
        <NewWellItemList requests={requests} refetch={refetch} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100'),
    height: hp('100'),
    backgroundColor: THEME.colors.darkLight,
  },
  header: {
    width: wp('100'),
    backgroundColor: THEME.colors.primary,
    height: hp('10'),
  },

  topContent: {
    width: '100%',
    height: hp('40%'),
    backgroundColor: THEME.colors.primary,
  },
});
