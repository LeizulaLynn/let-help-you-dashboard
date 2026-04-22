export type UserRole = 'ADMIN' | 'AGENT';

export type FieldStage = 'Planted' | 'Growing' | 'Ready' | 'Harvested';

export type FieldStatus = 'Active' | 'At Risk' | 'Completed';

export type AlertSeverity = 'Critical' | 'Warning' | 'Resolved';

export type ReportType = 'Field Performance' | 'Agent Activity' | 'Risk Analysis' | 'Seasonal Harvest';

export interface Observation {
  id: string;
  fieldId: string;
  agentId: string;
  agentName: string;
  date: string;
  stage: FieldStage;
  note: string;
  image?: string;
  isWarning?: boolean;
}

export interface Field {
  id: string;
  name: string;
  cropType: string;
  plantingDate: string;
  expectedHarvestDate: string;
  assignedAgentId: string;
  assignedAgentName: string;
  acreage: number;
  currentStage: FieldStage;
  status: FieldStatus;
  lastUpdateDate: string;
  observations: Observation[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  joinDate?: string;
  isVerified: boolean;
}

export interface Agent extends User {
  assignedFieldsCount: number;
  activeFields: number;
  atRiskFields: number;
  lastActivity: string;
  status: 'active' | 'offline';
}

export interface Alert {
  id: string;
  title: string;
  fieldId: string;
  fieldName: string;
  severity: AlertSeverity;
  reportedBy: string;
  timestamp: string;
  status: 'unresolved' | 'resolved';
  description: string;
  images?: string[];
  recommendedActions?: string[];
}

export interface Report {
  id: string;
  name: string;
  generatedBy: string;
  date: string;
  type: ReportType;
  url: string;
}

export interface SmartInsight {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
}