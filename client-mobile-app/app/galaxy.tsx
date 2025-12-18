import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const tabs = ['Equity', 'Debt', 'Hybrid', 'Thematic'];
const { width } = Dimensions.get('window');
const gridSize = width / 4;

export default function GalaxyViewScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Equity');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GALAXY VIEW</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Grid */}
      <View style={styles.gridContainer}>
        <View style={styles.yAxis}>
            <Text style={styles.axisLabel}>RETURNS (Y)</Text>
            <View style={styles.yAxisLine} />
        </View>
        
        <View style={styles.grid}>
            {/* Render grid lines */}
            {Array.from({ length: 5 }).map((_, i) => (
                <View key={`row-${i}`} style={styles.gridRow}>
                    {Array.from({ length: 4 }).map((_, j) => (
                        <View key={`cell-${i}-${j}`} style={styles.gridCell}>
                            {/* Random dots */}
                            {(i === 1 && j === 3) && <View style={[styles.dot, { backgroundColor: '#9CA3AF' }]} />}
                            {(i === 2 && j === 2) && (
                                <View style={styles.selectedDotContainer}>
                                    <View style={styles.selectedDotRing} />
                                    <View style={styles.selectedDot} />
                                    <View style={styles.connectorLine} />
                                </View>
                            )}
                            {(i === 3 && j === 2) && <View style={[styles.dot, { backgroundColor: 'black', width: 8, height: 8 }]} />}
                            {(i === 4 && j === 1) && <View style={[styles.dot, { backgroundColor: '#D1D5DB' }]} />}
                            {(i === 5 && j === 0) && <View style={[styles.dot, { backgroundColor: '#E5E7EB' }]} />}
                        </View>
                    ))}
                </View>
            ))}
        </View>
      </View>

      {/* Overlay Card */}
      <View style={styles.overlayCard}>
        <View style={styles.cardHeader}>
            <View style={styles.fundIcon}>
                <Ionicons name="trending-up" size={16} color="white" />
            </View>
            <Text style={styles.fundCategory}>EQUITY • LARGE CAP</Text>
            <TouchableOpacity style={styles.closeButton}>
                <Ionicons name="close" size={16} color="#6B7280" />
            </TouchableOpacity>
        </View>
        
        <Text style={styles.fundName}>Axis Bluechip Fund</Text>
        
        <View style={styles.statsRow}>
            <View>
                <Text style={styles.statLabel}>3Y RETURN</Text>
                <Text style={styles.statValue}>+15.4%</Text>
            </View>
            <View style={styles.divider} />
            <View>
                <Text style={styles.statLabel}>RISK (SD)</Text>
                <Text style={styles.statValue}>12.1</Text>
            </View>
            
            <TouchableOpacity style={styles.analyzeButton} onPress={() => router.push('/analysis')}>
                <Text style={styles.analyzeButtonText}>Analyze</Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
        </View>
        
        <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack}>
                <View style={styles.sliderFill} />
            </View>
            <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>Low Risk</Text>
                <Text style={styles.sliderLabel}>High Return</Text>
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#111827',
  },
  tabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: 'black',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: 'white',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  yAxis: {
    width: 40,
    alignItems: 'center',
    paddingTop: 20,
  },
  axisLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#9CA3AF',
    transform: [{ rotate: '-90deg' }],
    width: 100,
    textAlign: 'center',
    marginBottom: 20,
  },
  yAxisLine: {
    flex: 1,
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  grid: {
    flex: 1,
  },
  gridRow: {
    flexDirection: 'row',
    height: gridSize,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  gridCell: {
    width: gridSize,
    height: gridSize,
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
  },
  selectedDotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDotRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  connectorLine: {
    position: 'absolute',
    left: 20,
    top: 8,
    width: 40,
    height: 1,
    backgroundColor: '#9CA3AF',
  },
  overlayCard: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fundIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  fundCategory: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6B7280',
    letterSpacing: 1,
  },
  closeButton: {
    padding: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
  },
  fundName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    width: '70%',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  analyzeButton: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sliderContainer: {
    gap: 8,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  sliderFill: {
    width: '60%',
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
});
