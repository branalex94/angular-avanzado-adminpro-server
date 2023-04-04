const getMenu = (role = 'USER_ROLE') => {
  const menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          path: '/'
        },
        {
          title: 'ProgressBar',
          path: 'progress'
        },
        {
          title: 'Gráficas',
          path: 'grafica1'
        },
        {
          title: 'Promesas',
          path: 'promesas'
        },
        {
          title: 'RxJS',
          path: 'rxjs'
        }
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        // { title: 'Usuarios', path: 'users' },
        { title: 'Hospitales', path: 'hospitals' },
        { title: 'Medicos', path: 'medics' }
      ]
    }
  ]

  if (role === 'ADMIN_ROLE') {
    menu[1].submenu.unshift({
      title: 'Usuarios',
      path: 'users'
    })
  }
  return menu
}

module.exports = {
  getMenu
}
