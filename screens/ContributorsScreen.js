import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { responsive } from '../utils/responsive';

const ContributorsScreen = ({ navigation }) => {
  const aiimsContributors = [
    'Dr Biswaroop Chakrabarty',
    'Dr Richa Tiwari',
    'Professor Sheffali Gulati',
    'Professor Sudip Datta',
    'Dr Prashant Jauhari',
    'Professor Rakesh Lodha',
    'Professor Jhuma Sankar',
    'Professor R M Pandey',
    'Dr Ashish Dutt Upadhyay',
    'Sumit Kumar',
    'Anjali Kumari',
    'Danishta Ali',
  ];

  const iiitdContributors = [
    'Tavpritesh Sethi, MBBS, Ph.D.,\nProfessor, Computational Biology, IIIT-Delhi,\nFounding Head, Center of Excellence in Healthcare, IIIT-Delhi',
    'Pradeep Singh\nResearch Scholar (PhD19208)',
    'Pawan Yadav\nLead Software Developer',
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text 
          style={styles.headerTitle}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
        >
          Contributors
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentContainer}>
        {/* AIIMS Section */}
        <View style={styles.section}>
          <View style={styles.institutionHeader}>
            <Text 
              style={styles.institutionTitle}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              AIIMS, New Delhi
            </Text>
          </View>
          
          <View style={styles.contributorsList}>
            {aiimsContributors.map((contributor, index) => (
              <View key={index} style={styles.contributorItem}>
                <Text style={styles.contributorBullet}>•</Text>
                <Text style={styles.contributorName}>
                  {contributor}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* IIITD Section */}
        <View style={styles.section}>
          <View style={styles.institutionHeader}>
            <Text 
              style={styles.institutionTitle}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              IIIT Delhi
            </Text>
          </View>
          
          <View style={styles.contributorsList}>
            {iiitdContributors.map((contributor, index) => (
              <View key={index} style={styles.contributorItem}>
                <Text style={styles.contributorBullet}>•</Text>
                <Text style={styles.contributorName}>
                  {contributor}
                </Text>
              </View>
            ))}
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.scalePadding(20),
    paddingVertical: responsive.scalePadding(16),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    paddingVertical: responsive.scalePadding(8),
    paddingHorizontal: responsive.scalePadding(12),
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: responsive.scaleFont(24),
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: responsive.scaleFont(18),
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: responsive.scaleSize(60),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: responsive.scalePadding(20),
  },
  contentContainer: {
    width: '100%',
    maxWidth: responsive.getMaxContentWidth(),
    alignSelf: 'center',
  },
  section: {
    backgroundColor: 'white',
    margin: responsive.scalePadding(20),
    marginBottom: responsive.scalePadding(16),
    borderRadius: 16,
    padding: responsive.scalePadding(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  institutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.scalePadding(20),
    paddingBottom: responsive.scalePadding(16),
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  institutionTitle: {
    fontSize: responsive.scaleFont(22),
    fontWeight: 'bold',
    color: '#1E293B',
  },
  contributorsList: {
    gap: responsive.scalePadding(12),
  },
  contributorItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: responsive.scalePadding(8),
  },
  contributorBullet: {
    fontSize: responsive.scaleFont(18),
    color: '#2563EB',
    marginRight: responsive.scalePadding(12),
    marginTop: 2,
  },
  contributorName: {
    flex: 1,
    fontSize: responsive.scaleFont(16),
    color: '#374151',
    lineHeight: responsive.scaleFont(24),
    fontWeight: '400',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default ContributorsScreen;

