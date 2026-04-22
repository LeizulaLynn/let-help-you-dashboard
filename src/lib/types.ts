export type UserRole = 'ADMIN' | 'AGENT';

export type FieldStage = 'Planted' | 'Growing' | 'Ready' | 'Harvested';

export type FieldStatus = 'Active' | 'At Risk' | 'Completed';

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
  isVerified: boolean;
}

export interface SmartInsight {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
}