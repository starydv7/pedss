import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contributors</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        {/* AIIMS Section */}
        <View style={styles.section}>
          <View style={styles.institutionHeader}>
            <Text style={styles.institutionEmoji}>🏛️</Text>
            <Text style={styles.institutionTitle}>AIIMS, New Delhi</Text>
          </View>
          
          <View style={styles.contributorsList}>
            {aiimsContributors.map((contributor, index) => (
              <View key={index} style={styles.contributorItem}>
                <Text style={styles.contributorBullet}>•</Text>
                <Text style={styles.contributorName}>{contributor}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* IIITD Section - Placeholder for future */}
        <View style={styles.section}>
          <View style={styles.institutionHeader}>
            <Text style={styles.institutionEmoji}>🔬</Text>
            <Text style={styles.institutionTitle}>IIIT Delhi</Text>
          </View>
          
          <View style={styles.placeholderSection}>
            <Text style={styles.placeholderText}>
              Contributors to be added after discussion with Dr Tavpritesh
            </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  placeholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    margin: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 24,
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
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  institutionEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  institutionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  contributorsList: {
    gap: 12,
  },
  contributorItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  contributorBullet: {
    fontSize: 18,
    color: '#2563EB',
    marginRight: 12,
    marginTop: 2,
  },
  contributorName: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  placeholderSection: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
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

