import type { SfTargetKind } from '../../../share/types/spiderfoot';

export type KindOption = {
  value: SfTargetKind;
  label: string;
  hint: string;
};

export const KIND_OPTIONS: KindOption[] = [
  { value: 'EMAILADDR', label: 'Email', hint: 'user@example.com' },
  { value: 'DOMAIN_NAME', label: 'Домен', hint: 'example.com (без https://)' },
  { value: 'URL', label: 'URL', hint: 'https://example.com/profile' },
  { value: 'IP_ADDRESS', label: 'IPv4', hint: '8.8.8.8' },
  { value: 'IPV6_ADDRESS', label: 'IPv6', hint: '2001:db8::1' },
  { value: 'PHONE_NUMBER', label: 'Телефон', hint: '+77001234567' },
  { value: 'HUMAN_NAME', label: 'ФИО', hint: 'Иван Иванов' },
  { value: 'USERNAME', label: 'Username', hint: 'nickname' },
  { value: 'SOCIAL_MEDIA', label: 'Соцсеть', hint: '@nickname или ссылка' },
  { value: 'INTERNET_NAME', label: 'Internet name', hint: 'host.example.com' },
  { value: 'BGP_AS_OWNER', label: 'BGP AS', hint: 'только цифры (например 15169)' },
  { value: 'NETBLOCK_OWNER', label: 'Netblock owner', hint: 'описание/владелец' },
  { value: 'NETBLOCKV6_OWNER', label: 'Netblock v6 owner', hint: 'описание/владелец' },
  { value: 'BITCOIN_ADDRESS', label: 'BTC address', hint: '1BoatSLRHtKNngkdXEeobR76b53LETtpyT' },
  { value: 'RAW', label: 'Raw', hint: 'произвольная строка (осторожно)' },
];

export type Example = { label: string; value: string; kind?: SfTargetKind };

export const EXAMPLES: Example[] = [
  { label: 'Email', value: 'user@example.com', kind: 'EMAILADDR' },
  { label: 'Домен', value: 'example.com', kind: 'DOMAIN_NAME' },
  { label: 'IP', value: '8.8.8.8', kind: 'IP_ADDRESS' },
  { label: 'Телефон', value: '+77001234567', kind: 'PHONE_NUMBER' },
  { label: 'ФИО', value: 'Иван Иванов', kind: 'HUMAN_NAME' },
  { label: 'Username', value: 'nickname', kind: 'USERNAME' },
];
