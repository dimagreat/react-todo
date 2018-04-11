// @flow
export const ALL: string = 'ALL';
export const COMPLETED: string = 'COMPLETED';
export const NOT_COMPLETED: string = 'NOT_COMPLETED';
export const HIGH: string = 'HIGH';
export const NORMAL: string = 'NORMAL';
export const LOW: string = 'LOW';

export interface TodoEntity {
  title: string;
  id: string;
  isCompleted: boolean;
  priority: string;
}
