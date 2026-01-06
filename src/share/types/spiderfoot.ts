export type SfTargetKind =
  | 'IP_ADDRESS'
  | 'IPV6_ADDRESS'
  | 'NETBLOCK_OWNER'
  | 'NETBLOCKV6_OWNER'
  | 'BGP_AS_OWNER'
  | 'EMAILADDR'
  | 'PHONE_NUMBER'
  | 'HUMAN_NAME'
  | 'USERNAME'
  | 'BITCOIN_ADDRESS'
  | 'INTERNET_NAME'
  | 'DOMAIN_NAME'
  | 'URL'
  | 'SOCIAL_MEDIA'
  | 'RAW';

export type SpiderfootScanMode = 'single' | 'multi';
export type SpiderfootScanSpeed = 'fast' | 'slow';

export type CreateSpiderfootScanDto = {
  target: string;
  mode?: SpiderfootScanMode;
  speed?: SpiderfootScanSpeed;
  kind?: SfTargetKind;
  maxParallelScans?: number;
  pollIntervalMs?: number;
  maxWaitMs?: number;
};

export type CreateSpiderfootScanResponse = {
  groupId: string;
  scans: Array<{ scanId: string; kind: SfTargetKind; target: string }>;
  socket: { namespace: string; room: string };
  group: unknown;
};
