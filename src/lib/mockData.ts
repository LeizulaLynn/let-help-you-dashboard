import { UserRole, FieldStage, FieldStatus, Observation, Field, User, SmartInsight } from './types';

export const mockUsers: User[] = [
  { id: '1', name: 'Lynn Coordinator', email: 'admin@smartseason.com', role: 'ADMIN', isVerified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lynn' },
  { id: '2', name: 'James Fieldman', email: 'agent@smartseason.com', role: 'AGENT', isVerified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
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
    isWarning: true
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