import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ASSESSMENTS: '@pedss_assessments',
  SETTINGS: '@pedss_settings',
  PROFILE: '@pedss_profile',
  ASSESSMENT_COUNTS: '@pedss_assessment_counts',
};

class StorageService {
  // ========== ASSESSMENT METHODS ==========
  
  /**
   * Save a new assessment
   */
  async saveAssessment(assessmentData) {
    try {
      const assessments = await this.getAllAssessments();
      const newAssessment = {
        id: Date.now().toString(),
        ...assessmentData,
        createdAt: new Date().toISOString(),
      };
      assessments.push(newAssessment);
      await AsyncStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
      
      // Update assessment counts
      await this.updateAssessmentCounts(assessmentData.riskLevel);
      
      return newAssessment;
    } catch (error) {
      console.error('Error saving assessment:', error);
      throw new Error('Failed to save assessment');
    }
  }

  /**
   * Update assessment counts (only counts, not full data)
   */
  async updateAssessmentCounts(riskLevel) {
    try {
      const counts = await this.getAssessmentCounts();
      counts.total = (counts.total || 0) + 1;
      
      if (riskLevel === 'High') {
        counts.highRisk = (counts.highRisk || 0) + 1;
      } else if (riskLevel === 'Medium') {
        counts.mediumRisk = (counts.mediumRisk || 0) + 1;
      } else if (riskLevel === 'Low') {
        counts.lowRisk = (counts.lowRisk || 0) + 1;
      }
      
      await AsyncStorage.setItem(STORAGE_KEYS.ASSESSMENT_COUNTS, JSON.stringify(counts));
      return counts;
    } catch (error) {
      console.error('Error updating counts:', error);
    }
  }

  /**
   * Get assessment counts (only counts, not full data)
   */
  async getAssessmentCounts() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ASSESSMENT_COUNTS);
      return data ? JSON.parse(data) : {
        total: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
      };
    } catch (error) {
      console.error('Error loading counts:', error);
      return {
        total: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
      };
    }
  }

  /**
   * Get all saved assessments
   */
  async getAllAssessments() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading assessments:', error);
      return [];
    }
  }

  /**
   * Get a single assessment by ID
   */
  async getAssessmentById(id) {
    try {
      const assessments = await this.getAllAssessments();
      return assessments.find(assessment => assessment.id === id);
    } catch (error) {
      console.error('Error loading assessment:', error);
      return null;
    }
  }

  /**
   * Delete an assessment
   */
  async deleteAssessment(id) {
    try {
      const assessments = await this.getAllAssessments();
      const assessmentToDelete = assessments.find(a => a.id === id);
      const filtered = assessments.filter(assessment => assessment.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(filtered));
      
      // Update counts when deleting
      if (assessmentToDelete) {
        const counts = await this.getAssessmentCounts();
        counts.total = Math.max(0, (counts.total || 0) - 1);
        
        if (assessmentToDelete.riskLevel === 'High') {
          counts.highRisk = Math.max(0, (counts.highRisk || 0) - 1);
        } else if (assessmentToDelete.riskLevel === 'Medium') {
          counts.mediumRisk = Math.max(0, (counts.mediumRisk || 0) - 1);
        } else if (assessmentToDelete.riskLevel === 'Low') {
          counts.lowRisk = Math.max(0, (counts.lowRisk || 0) - 1);
        }
        
        await AsyncStorage.setItem(STORAGE_KEYS.ASSESSMENT_COUNTS, JSON.stringify(counts));
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting assessment:', error);
      throw new Error('Failed to delete assessment');
    }
  }

  /**
   * Clear all assessments
   */
  async clearAllAssessments() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
      // Reset counts
      await AsyncStorage.setItem(STORAGE_KEYS.ASSESSMENT_COUNTS, JSON.stringify({
        total: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
      }));
      return true;
    } catch (error) {
      console.error('Error clearing assessments:', error);
      throw new Error('Failed to clear assessments');
    }
  }

  /**
   * Get assessment statistics
   */
  async getStatistics() {
    try {
      // Use the separate count storage for faster and more accurate counts
      const counts = await this.getAssessmentCounts();
      
      // Calculate average score from all assessments (needed for avgScore)
      const assessments = await this.getAllAssessments();
      const avgScore = counts.total > 0 
        ? assessments.reduce((sum, a) => sum + (a.score || 0), 0) / counts.total 
        : 0;

      return {
        total: counts.total || 0,
        highRisk: counts.highRisk || 0,
        mediumRisk: counts.mediumRisk || 0,
        lowRisk: counts.lowRisk || 0,
        avgScore: Math.round(avgScore * 10) / 10,
      };
    } catch (error) {
      console.error('Error calculating statistics:', error);
      return {
        total: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
        avgScore: 0,
      };
    }
  }

  // ========== SETTINGS METHODS ==========
  
  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      throw new Error('Failed to save settings');
    }
  }

  async getSettings() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        notifications: true,
        darkMode: false,
        autoSave: true,
        dataSync: false,
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        notifications: true,
        darkMode: false,
        autoSave: true,
        dataSync: false,
      };
    }
  }

  // ========== PROFILE METHODS ==========
  
  async saveProfile(profile) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw new Error('Failed to save profile');
    }
  }

  async getProfile() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  }

  // ========== EXPORT METHODS ==========
  
  /**
   * Export assessments as CSV
   */
  async exportToCSV() {
    try {
      const assessments = await this.getAllAssessments();
      
      // CSV Header
      const headers = [
        'ID',
        'Patient Name',
        'Age',
        'Gender',
        'Date',
        'P Score',
        'E Score',
        'D Score',
        'S1 Score',
        'S2 Score',
        'Total Score',
        'Risk Level',
        'Created At'
      ];
      
      // CSV Rows
      const rows = assessments.map(assessment => [
        assessment.id || '',
        assessment.patientData?.name || '',
        assessment.patientData?.age || '',
        assessment.patientData?.gender || '',
        assessment.patientData?.date || '',
        assessment.parameters?.P || 0,
        assessment.parameters?.E || 0,
        assessment.parameters?.D || 0,
        assessment.parameters?.S1 || 0,
        assessment.parameters?.S2 || 0,
        assessment.score || 0,
        assessment.riskLevel || '',
        assessment.createdAt || ''
      ]);
      
      // Combine header and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      return csvContent;
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      throw new Error('Failed to export data');
    }
  }

  /**
   * Export assessments as JSON (for PDF generation)
   */
  async exportToJSON() {
    try {
      const assessments = await this.getAllAssessments();
      return JSON.stringify(assessments, null, 2);
    } catch (error) {
      console.error('Error exporting to JSON:', error);
      throw new Error('Failed to export data');
    }
  }
}

export default new StorageService();

