// @flow
export const ALL: string = 'ALL';
export const COMPLETED: string = 'COMPLETED';
export const NOT_COMPLETED: string = 'NOT_COMPLETED';
export type TodoEntity = {
  name: string,
  id: string,
  isCompleted: boolean,
};
