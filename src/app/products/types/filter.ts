export type DynamicFilterOperator =
  | 'contains'
  | 'equals'
  | 'greaterEqual'
  | 'lessEquals';

export interface DynamicFilter<T = any> {
  id: string;
  operator: DynamicFilterOperator;
  value: string | number;
  dataProperty: keyof T;
}
