export interface Activity {
  description: string | null;
  expected_end_date: string | null;
  expected_start_date: string | null;
  id: number;
  level2_uuid: string;
  name: string;
  url: string;
  workflowlevel1?: string;
}

export type NewActivity = Pick<
  Activity,
  'name' | 'expected_start_date' | 'expected_end_date' | 'workflowlevel1'
>;
