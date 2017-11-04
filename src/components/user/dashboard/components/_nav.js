export default {
  items: [
    {
      name: 'app.dashboard.customer',
      url: '/lawyers/customer',
      icon: 'icon-speech',
      badge: {
        variant: 'info',
      },
      children:[
        {
          name: 'tep chia se',
          url: '/lawyers/files-shared'
        },
        {
          name: 'todo list',
          url: '/lawyers/todos'
        }
      ]
    },
    {
      name: 'app.dashboard.search.title',
      icon: 'icon-support',
      badge: {
        variant: 'info',
      },
      children: [
        {
          name: 'app.dashboard.search.by_user',
          url: '/lawyers/search_user'
        },
        {
          name: 'app.dashboard.search.by_tag',
          url: '/lawyers/search_tag'
        }
      ]
    },
    {
      name: 'app.dashboard.dashboard',
      url: '/lawyers/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      }
    },
    {
      name: 'app.dashboard.note',
      url: '/lawyers/notes',
      icon: 'icon-note',
      badge: {
        variant: 'info'
      }
    },
    {
      name: 'app.dashboard.calendar',
      url: '/lawyers/calendar',
      icon: 'icon-calendar',
      badge: {
        variant: 'info'
      }
    },
    {
      name: 'app.dashboard.profile',
      url: '/lawyers/profile',
      icon: 'icon-user',
      badge: {
        variant: 'info'
      }
    }
  ]
};
