import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ASSESSMENTS: '@pedss_assessments',
  SETTINGS: '@pedss_settings',
  PROFILE: '@pedss_profile',
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
      return newAssessment;
    } catch (error) {
      console.error('Error saving assessment:', error);
      throw new Error('Failed to save assessment');
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
      const filtered = assessments.filter(assessment => assessment.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(filtered));
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
      const assessments = await this.getAllAssessments();
      const total = assessments.length;
      const highRisk = assessments.filter(a => a.riskLevel === 'High').length;
      const mediumRisk = assessments.filter(a => a.riskLevel === 'Medium').length;
      const lowRisk = assessments.filter(a => a.riskLevel === 'Low').length;
      const avgScore = total > 0 
        ? assessments.reduce((sum, a) => sum + (a.score || 0), 0) / total 
        : 0;

      return {
        total,
        highRisk,
        mediumRisk,
        lowRisk,
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

