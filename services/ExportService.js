import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import StorageService from './StorageService';

class ExportService {
  /**
   * Export single assessment as CSV
   */
  async exportAssessmentCSV(assessment) {
    try {
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
      
      const row = [
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
      ];
      
      const csvContent = [
        headers.join(','),
        row.map(cell => `"${cell}"`).join(',')
      ].join('\n');
      
      const fileName = `PEDSS_Assessment_${assessment.id || Date.now()}.csv`;
      const fileUri = FileSystem.documentDirectory + fileName;
      
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
        return { success: true, message: 'Assessment exported successfully!' };
      } else {
        return { success: false, message: 'Sharing is not available on this device' };
      }
    } catch (error) {
      console.error('Error exporting assessment:', error);
      throw new Error('Failed to export assessment');
    }
  }

  /**
   * Export all assessments as CSV
   */
  async exportAllAssessmentsCSV() {
    try {
      const csvContent = await StorageService.exportToCSV();
      const fileName = `PEDSS_All_Assessments_${Date.now()}.csv`;
      const fileUri = FileSystem.documentDirectory + fileName;
      
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
        return { success: true, message: 'All assessments exported successfully!' };
      } else {
        return { success: false, message: 'Sharing is not available on this device' };
      }
    } catch (error) {
      console.error('Error exporting assessments:', error);
      throw new Error('Failed to export assessments');
    }
  }

  /**
   * Export assessment as PDF (text-based report)
   */
  async exportAssessmentPDF(assessment) {
    try {
      const report = this.generatePDFReport(assessment);
      const fileName = `PEDSS_Report_${assessment.id || Date.now()}.txt`;
      const fileUri = FileSystem.documentDirectory + fileName;
      
      await FileSystem.writeAsStringAsync(fileUri, report, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
        return { success: true, message: 'Report exported successfully!' };
      } else {
        return { success: false, message: 'Sharing is not available on this device' };
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      throw new Error('Failed to export report');
    }
  }

  /**
   * Generate PDF report text
   */
  generatePDFReport(assessment) {
    const { patientData, score, riskLevel, parameters } = assessment;
    
    return `
PEDSS ASSESSMENT REPORT
========================

PATIENT INFORMATION
-------------------
Name/ID: ${patientData?.name || 'N/A'}
Age: ${patientData?.age || 'N/A'} months
Gender: ${patientData?.gender || 'N/A'}
Assessment Date: ${patientData?.date || 'N/A'}

PEDSS SCORE
-----------
Total Score: ${score}/6
Risk Level: ${riskLevel}

PARAMETER BREAKDOWN
-------------------
P (Premorbid PCPCS): ${parameters?.P || 0}/1
E (EEG Background): ${parameters?.E || 0}/1
D (Drug Refractoriness): ${parameters?.D || 0}/2
S1 (Seizure Semiology): ${parameters?.S1 || 0}/1
S2 (Critical Sickness): ${parameters?.S2 || 0}/1

CLINICAL INTERPRETATION
-----------------------
${this.getClinicalInterpretation(score)}

RISK ASSESSMENT
---------------
${this.getRiskDescription(score)}

---
Report Generated: ${new Date().toLocaleString()}
PEDSS App v1.0.0
AIIMS, New Delhi × IIIT Delhi
    `.trim();
  }

  getClinicalInterpretation(score) {
    if (score >= 4) {
      return 'This patient demonstrates high-risk factors including abnormal premorbid status and drug refractoriness. Immediate intensive care unit admission with continuous monitoring is strongly recommended.';
    } else if (score >= 3) {
      return 'The patient shows concerning features that suggest a poor outcome is likely. Close monitoring in a high-dependency unit is advised.';
    } else if (score >= 1) {
      return 'Moderate risk factors are present. Standard care protocols should be followed with regular reassessment.';
    } else {
      return 'Low risk profile suggests good prognosis with routine care. Continue standard monitoring and treatment protocols.';
    }
  }

  getRiskDescription(score) {
    if (score >= 4) {
      return 'HIGH MORTALITY RISK - Immediate intensive care recommended.';
    } else if (score >= 3) {
      return 'MEDIUM RISK - Poor outcome likely. Close monitoring and aggressive treatment advised.';
    } else if (score >= 1) {
      return 'MODERATE RISK - Standard care with regular assessment.';
    } else {
      return 'LOW RISK - Routine care and monitoring.';
    }
  }
}

export default new ExportService();

