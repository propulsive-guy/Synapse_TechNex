import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const holdings = [
  {
    id: 1,
    name: 'BLUE CHIP GROWTH',
    type: 'Large Cap',
    value: '₹4.2L',
    change: '+12%',
    icon: 'chart-pie',
  },
  {
    id: 2,
    name: 'NIFTY 50 INDEX',
    type: 'Index Fund',
    value: '₹2.8L',
    change: '+8.4%',
    icon: 'chart-line',
  },
  {
    id: 3,
    name: 'CORP BOND FUND',
    type: 'AAA Rated',
    value: '₹1.5L',
    change: '+4.2%',
    icon: 'piggy-bank',
  },
  {
    id: 4,
    name: 'SOVEREIGN GOLD',
    type: 'SGB 2024',
    value: '₹1.1L',
    change: '+2.1%',
    icon: 'coins',
  },
];

const tabs = ['Equity', 'Debt', 'Gold', 'Thematic'];

export default function PortfolioScreen() {
  const [activeTab, setActiveTab] = useState('Equity');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>WEALTH DISTRIBUTION</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-add" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Net Worth & Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.netWorthLabel}>NET WORTH</Text>
          <Text style={styles.netWorthValue}>₹12,50,000</Text>

          <View style={styles.chartContainer}>
            {/* Placeholder for Donut Chart */}
            <View style={styles.donutChart}>
              <View style={styles.donutInner}>
                <Text style={styles.chartLabel}>EQUITY</Text>
                <Text style={styles.chartValue}>60<Text style={styles.percentSymbol}>%</Text></Text>
                <View style={styles.chartBadge}>
                  <Ionicons name="arrow-up" size={12} color="black" />
                  <Text style={styles.chartBadgeText}>+12.4%</Text>
                </View>
              </View>
            </View>
            {/* Simulated segments */}
            <View style={[styles.segment, { transform: [{ rotate: '45deg' }] }]} />
          </View>
        </View>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              {activeTab === tab && <View style={styles.activeDot} />}
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Top Holdings */}
        <View style={styles.holdingsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TOP HOLDINGS</Text>
            <TouchableOpacity>
                <Ionicons name="filter" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={styles.holdingsList}>
            {holdings.map((item) => (
              <View key={item.id} style={styles.holdingCard}>
                <View style={styles.holdingIcon}>
                  <FontAwesome5 name={item.icon} size={20} color="black" />
                </View>
                <View style={styles.holdingInfo}>
                  <Text style={styles.holdingName}>{item.name}</Text>
                  <Text style={styles.holdingType}>{item.type}</Text>
                </View>
                <View style={styles.holdingValueContainer}>
                  <Text style={styles.holdingValue}>{item.value}</Text>
                  <Text style={styles.holdingChange}>{item.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#6B7280',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  netWorthLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  netWorthValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 32,
  },
  chartContainer: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  donutChart: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 10,
    borderColor: '#E5E7EB', // Light gray base
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutInner: {
    alignItems: 'center',
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  chartValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 70,
  },
  percentSymbol: {
    fontSize: 32,
    color: '#9CA3AF',
  },
  chartBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chartBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  segment: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 10,
    borderColor: 'transparent',
    borderTopColor: '#4B5563', // Dark gray segment
    borderRightColor: '#4B5563',
    transform: [{ rotate: '-45deg' }],
  },
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: 'white',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    gap: 8,
  },
  activeTab: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: 'white',
  },
  holdingsContainer: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#9CA3AF',
  },
  holdingsList: {
    gap: 16,
  },
  holdingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  holdingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  holdingInfo: {
    flex: 1,
  },
  holdingName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  holdingType: {
    fontSize: 12,
    color: '#6B7280',
  },
  holdingValueContainer: {
    alignItems: 'flex-end',
  },
  holdingValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  holdingChange: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
});
