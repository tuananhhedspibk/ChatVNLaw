export default {
  items: [
    {
      name: 'app.dashboard.customer',
      url: '/dashboard/customer',
      icon: 'icon-speech',
      badge: {
        variant: 'info',
      },
      children:[
        {
          name: 'app.chat.shared_files',
          url: '/dashboard/files-shared'
        },
        {
          name: 'app.chat.todo_list',
          url: '/dashboard/todos'
        }
      ]
    },
    {
      name: 'app.chat.todo_list',
      url: '/dashboard/todolistlawyer',
      icon: 'icon-list',
      badge: {
        variant: 'info'
      }
    },
    {
      name: 'app.dashboard.search.title',
      icon: 'icon-magnifier',
      badge: {
        variant: 'info',
      },
      children: [
        {
          name: 'app.dashboard.search.by_user',
          url: '/dashboard/searchuser'
        },
        {
          name: 'app.dashboard.search.by_tag',
          url: '/dashboard/searchtag'
        }
      ]
    },
    {
      name: 'app.dashboard.calendar',
      url: '/dashboard/calendar',
      icon: 'icon-calendar',
      badge: {
        variant: 'info'
      }
    }
  ]
};
