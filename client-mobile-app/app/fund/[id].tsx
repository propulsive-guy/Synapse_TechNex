import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const timeRanges = ['1M', '6M', '1Y', '3Y', '5Y', 'ALL'];

export default function FundDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedRange, setSelectedRange] = useState('1Y');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerSubtitle}>GROWTH FUND</Text>
            <Text style={styles.headerTitle}>Quant Small Cap</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Price Info */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹145.67</Text>
          <View style={styles.changeContainer}>
            <View style={styles.changeBadge}>
              <Ionicons name="trending-up" size={12} color="black" />
              <Text style={styles.changeText}>+2.4%</Text>
            </View>
            <Text style={styles.changeLabel}>1D Change</Text>
          </View>
        </View>

        {/* Graph Placeholder */}
        <View style={styles.graphContainer}>
          {/* Tooltip */}
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>₹142.10</Text>
            <View style={styles.tooltipArrow} />
          </View>
          
          {/* Graph Line */}
          <View style={styles.graphLineContainer}>
             <View style={styles.graphLine} />
             <View style={styles.graphDot} />
          </View>
          
          {/* X Axis */}
          <View style={styles.xAxis}>
            <Text style={styles.axisLabel}>OCT</Text>
            <Text style={styles.axisLabel}>NOV</Text>
            <Text style={styles.axisLabel}>DEC</Text>
            <Text style={styles.axisLabel}>JAN</Text>
            <Text style={styles.axisLabel}>FEB</Text>
          </View>
        </View>

        {/* Time Range Selector */}
        <View style={styles.rangeSelector}>
          {timeRanges.map((range) => (
            <TouchableOpacity
              key={range}
              style={[styles.rangeButton, selectedRange === range && styles.rangeButtonActive]}
              onPress={() => setSelectedRange(range)}
            >
              <Text style={[styles.rangeText, selectedRange === range && styles.rangeTextActive]}>{range}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Compare Button */}
        <TouchableOpacity style={styles.compareButton}>
          <Ionicons name="git-compare-outline" size={20} color="black" />
          <Text style={styles.compareButtonText}>Compare Benchmark</Text>
        </TouchableOpacity>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>MIN INVEST</Text>
            <Text style={styles.statValue}>₹500</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>FUND SIZE</Text>
            <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>₹2.4k</Text>
                <Text style={styles.statUnit}>Cr</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>RISK LEVEL</Text>
            <View style={styles.riskContainer}>
                <Ionicons name="flash" size={12} color="black" />
                <Text style={styles.statValue}>High</Text>
            </View>
          </View>
        </View>

        {/* Performance Insight */}
        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <Ionicons name="trending-up" size={24} color="black" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Performance Insight</Text>
            <Text style={styles.insightText}>
              This fund has outperformed the benchmark by <Text style={styles.boldText}>12.5%</Text> in the last year. Strong momentum in mid-cap allocation.
            </Text>
          </View>
        </View>
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
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#6B7280',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  changeLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  graphContainer: {
    height: 250,
    marginBottom: 32,
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    top: 0,
    right: 80,
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    zIndex: 10,
  },
  tooltipText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    backgroundColor: 'black',
    transform: [{ rotate: '45deg' }],
  },
  graphLineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  graphLine: {
    width: '100%',
    height: 100,
    borderTopWidth: 4,
    borderTopColor: 'black',
    borderRadius: 100, // Fake curve
    transform: [{ scaleX: 1.5 }, { rotate: '-10deg' }],
  },
  graphDot: {
    position: 'absolute',
    top: 80,
    right: 100,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  axisLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#9CA3AF',
    letterSpacing: 1,
  },
  rangeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 30,
    padding: 4,
    marginBottom: 24,
  },
  rangeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 26,
  },
  rangeButtonActive: {
    backgroundColor: 'black',
  },
  rangeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  rangeTextActive: {
    color: 'white',
  },
  compareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
    marginBottom: 32,
  },
  compareButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'flex-start',
    height: 100,
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#9CA3AF',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  statUnit: {
    fontSize: 12,
    color: '#6B7280',
  },
  riskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB', // Or white with border
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 16,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#111827',
  },
});
