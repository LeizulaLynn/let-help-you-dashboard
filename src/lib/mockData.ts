import { Agent, Alert, Field, Observation, Report, User } from './types';

export const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'Lynn Coordinator', 
    email: 'admin@smartseason.com', 
    role: 'ADMIN', 
    isVerified: true, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lynn',
    phone: '+1 (555) 012-3456',
    joinDate: '2023-01-15'
  },
  { 
    id: '2', 
    name: 'James Fieldman', 
    email: 'agent@smartseason.com', 
    role: 'AGENT', 
    isVerified: true, 
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/agent-1---james-2b3c1796-1776888177744.webp',
    phone: '+1 (555) 987-6543',
    joinDate: '2023-03-20'
  },
];

export const mockAgents: Agent[] = [
  {
    id: '2',
    name: 'James Fieldman',
    email: 'james@smartseason.com',
    role: 'AGENT',
    isVerified: true,
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/agent-1---james-2b3c1796-1776888177744.webp',
    phone: '+1 (555) 987-6543',
    joinDate: '2023-03-20',
    assignedFieldsCount: 12,
    activeFields: 10,
    atRiskFields: 2,
    lastActivity: '2024-03-15T09:30:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: 'Sarah Growers',
    email: 'sarah@smartseason.com',
    role: 'AGENT',
    isVerified: true,
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/agent-2---sarah-bf4ef9e6-1776888177270.webp',
    phone: '+1 (555) 444-5555',
    joinDate: '2023-05-10',
    assignedFieldsCount: 8,
    activeFields: 8,
    atRiskFields: 0,
    lastActivity: '2024-03-14T16:45:00Z',
    status: 'offline'
  },
  {
    id: '4',
    name: 'Michael Harvest',
    email: 'michael@smartseason.com',
    role: 'AGENT',
    isVerified: true,
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/agent-3---michael-4fb99666-1776888178422.webp',
    phone: '+1 (555) 222-3333',
    joinDate: '2023-08-05',
    assignedFieldsCount: 15,
    activeFields: 12,
    atRiskFields: 3,
    lastActivity: '2024-03-15T10:15:00Z',
    status: 'active'
  }
];

export const mockObservations: Observation[] = [
  {
    id: 'o1',
    fieldId: 'f1',
    agentId: '2',
    agentName: 'James Fieldman',
    date: '2024-03-10T10:00:00Z',
    stage: 'Growing',
    note: 'Pest activity noticed on lower leaves. Applied organic pesticide.',
    isWarning: true,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/crop-monitoring-macro-faed2546-1776882533243.webp'
  },
  {
    id: 'o2',
    fieldId: 'f1',
    agentId: '2',
    agentName: 'James Fieldman',
    date: '2024-03-01T09:00:00Z',
    stage: 'Planted',
    note: 'Initial planting complete. Soil moisture looks good.'
  }
];

export const mockFields: Field[] = [
  {
    id: 'f1',
    name: 'North Field A',
    cropType: 'Maize',
    plantingDate: '2024-03-01',
    expectedHarvestDate: '2024-06-15',
    assignedAgentId: '2',
    assignedAgentName: 'James Fieldman',
    acreage: 45,
    currentStage: 'Growing',
    status: 'At Risk',
    lastUpdateDate: '2024-03-10',
    observations: mockObservations
  },
  {
    id: 'f2',
    name: 'South Block 3',
    cropType: 'Wheat',
    plantingDate: '2024-02-15',
    expectedHarvestDate: '2024-05-20',
    assignedAgentId: '2',
    assignedAgentName: 'James Fieldman',
    acreage: 30,
    currentStage: 'Growing',
    status: 'Active',
    lastUpdateDate: '2024-03-12',
    observations: []
  },
  {
    id: 'f3',
    name: 'East Valley',
    cropType: 'Soybeans',
    plantingDate: '2024-04-01',
    expectedHarvestDate: '2024-07-10',
    assignedAgentId: '3',
    assignedAgentName: 'Sarah Growers',
    acreage: 60,
    currentStage: 'Planted',
    status: 'Active',
    lastUpdateDate: '2024-04-01',
    observations: []
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    title: 'Pest Infestation Detected',
    fieldId: 'f1',
    fieldName: 'North Field A',
    severity: 'Critical',
    reportedBy: 'James Fieldman',
    timestamp: '2024-03-15T08:30:00Z',
    status: 'unresolved',
    description: 'Significant presence of fall armyworm detected in the northwest quadrant of the maize field. Immediate spraying recommended.',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/crop-monitoring-macro-faed2546-1776882533243.webp'],
    recommendedActions: ['Apply organic pesticide', 'Monitor surrounding fields', 'Increase inspection frequency']
  },
  {
    id: 'a2',
    title: 'Drought Risk Warning',
    fieldId: 'f3',
    fieldName: 'East Valley',
    severity: 'Warning',
    reportedBy: 'Sarah Growers',
    timestamp: '2024-03-14T14:20:00Z',
    status: 'unresolved',
    description: 'Soil moisture levels have dropped below 15%. No rain forecasted for the next 7 days.',
    recommendedActions: ['Initiate irrigation schedule', 'Check for soil crusting']
  },
  {
    id: 'a3',
    title: 'No Updates Received',
    fieldId: 'f2',
    fieldName: 'South Block 3',
    severity: 'Warning',
    reportedBy: 'System',
    timestamp: '2024-03-13T10:00:00Z',
    status: 'resolved',
    description: 'Field has not received an operational update for 10 consecutive days.',
  }
];

export const mockReports: Report[] = [
  {
    id: 'r1',
    name: 'Q1 Maize Performance Report',
    generatedBy: 'Lynn Coordinator',
    date: '2024-03-10',
    type: 'Field Performance',
    url: '#'
  },
  {
    id: 'r2',
    name: 'Monthly Risk Analysis - March',
    generatedBy: 'System',
    date: '2024-03-01',
    type: 'Risk Analysis',
    url: '#'
  },
  {
    id: 'r3',
    name: 'Field Agent Activity Audit',
    generatedBy: 'Lynn Coordinator',
    date: '2024-02-28',
    type: 'Agent Activity',
    url: '#'
  }
];

export const guestPreviews = [
  {
    title: 'Precision Dashboards',
    description: 'Comprehensive operational overviews with real-time field health metrics and workforce coordination.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/admin-dashboard-preview-681b7fb0-1776888780472.webp',
    icon: 'LayoutDashboard'
  },
  {
    title: 'Field Monitoring',
    description: 'Detailed field-level tracking with mobile updates, pest detection, and irrigation monitoring.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/field-monitoring-preview-1f17cb6b-1776888780831.webp',
    icon: 'MapPin'
  },
  {
    title: 'Lifecycle Visualization',
    description: 'Predictive modeling of crop growth stages from planting to harvest with historical comparisons.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/lifecycle-visualization-preview-efbfff14-1776888780880.webp',
    icon: 'Sprout'
  },
  {
    title: 'Advanced Analytics',
    description: 'Data-driven insights to optimize yield, manage risks, and ensure seasonal success.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/analytics-preview-1b48fe02-1776888780330.webp',
    icon: 'TrendingUp'
  }
];