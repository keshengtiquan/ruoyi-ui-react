export interface UserTree {
  key: number;
  id: number;
  parentId: number;
  label: string;
  weight: number;
  children: UserTree[];
}
