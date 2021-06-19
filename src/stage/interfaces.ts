export interface Stage {
  label: string;
  run: () => Promise<void>;
}
