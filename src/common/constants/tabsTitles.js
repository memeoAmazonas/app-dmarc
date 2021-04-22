export const LABEL_REPORT_TABS = [
  {label: 'reports.tabs.labels.pass.pass', id: 1},
  {label: 'reports.tabs.labels.pass.neutral', id: 2},
  {label: 'reports.tabs.labels.pass.fail', id: 3},
  {label: 'reports.tabs.labels.neutral.pass', id: 4},
  {label: 'reports.tabs.labels.neutral.neutral', id: 5},
  {label: 'reports.tabs.labels.neutral.fail', id: 6},
  {label: 'reports.tabs.labels.fail.pass', id: 7},
  {label: 'reports.tabs.labels.fail.neutral', id: 8},
  {label: 'reports.tabs.labels.fail.fail', id: 9},
];
export const LABEL_REPORT_TABLE = [
  {
    label: 'table.country',
    key: 'pais',
  },
  {
    label: 'risk.matrix.table.ip',
    key: 'ip',
  },

  /*  {
    label: 'table.reversedns',
    key: 'reverseDNS',
  }, */
  {
    label: 'dashboard.summary.messagesTotal',
    key: 'cont',
  },
];
export const LABEL_REPORT_TABLE_FORENSIC = {
  ip: [
    {
      label: 'risk.matrix.table.ip',
      key: 'ip',
    },
    {
      label: 'dashboard.summary.messagesTotal',
      key: 'count',
    },
  ],
  subject: [
    {
      value: 'subject',
      label: 'reports.radio.by.subject',
    },
    {
      label: 'dashboard.summary.messagesTotal',
      key: 'count',
    },

  ],
  pais: [
    {
      value: 'pais',
      label: 'table.country',
    },
    {
      label: 'dashboard.summary.messagesTotal',
      key: 'count',
    },
  ],
}
