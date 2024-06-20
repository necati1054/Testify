export const navigations = [
  { name: "Dashboard", path: "/dashboard", icon: "dashboard", auth: [1, 2, 3] },
  { label: 'Öğretmen', type: 'label', auth: [2] },
  {
    name: 'Öğretmen',
    icon: 'people',
    auth: [2],
    children: [
      { name: 'Oluşturduğum Testler', iconText: 'description', path: '/testıcreated', auth: [2] },
    ],
  },
  { label: 'Öğrenci', type: 'label', auth: [3] },
  {
    name: 'Öğrenci',
    icon: 'people',
    auth: [3],
    children: [
      { name: 'Çözmüş Olduğum Testler', iconText: 'description', path: '/testısolved', auth: [3] },
      { name: 'Bütün Testler', iconText: 'description', path: '/alltests', auth: [3] },
    ],
  },
  { label: 'Admin', type: 'label', auth: [1] },
  { name: 'Ayarlar', path: '/settings', icon: 'settings', auth: [1] },
];
