export const projectDir = `
│  App.vue
│  main.ts
│  shims-vue.d.ts
│
├─assets
│  ├─css
│  │      base.less
│  │      index.less
│  │
│  └─img
│          login-bg.svg
│          logo.svg
│
├─base-ui
│  ├─breadcrumb
│  │  │  index.ts
│  │  │
│  │  ├─src
│  │  │      breadcrumb.vue
│  │  │
│  │  └─types
│  │          index.ts
│  │
│  ├─card
│  │  │  index.ts
│  │  │
│  │  └─src
│  │          card.vue
│  │
│  ├─code
│  │  │  index.ts
│  │  │
│  │  └─src
│  │          index.vue
│  │
│  ├─descriptions
│  │  │  index.ts
│  │  │
│  │  └─src
│  │          data.d.ts
│  │          index.vue
│  │
│  ├─echart
│  │  │  index.ts
│  │  │
│  │  ├─data
│  │  │      china.json
│  │  │
│  │  ├─hooks
│  │  │      useEchart.ts
│  │  │
│  │  └─src
│  │          echart.vue
│  │
│  ├─form
│  │  │  index.ts
│  │  │
│  │  ├─src
│  │  │      form.vue
│  │  │
│  │  └─types
│  │          index.ts
│  │
│  ├─table
│  │  │  index.ts
│  │  │
│  │  └─src
│  │          table.vue
│  │
│  └─text-link
│      │  index.ts
│      │
│      └─src
│              index.vue
│
├─components
│  ├─card
│  │  │  index.ts
│  │  │
│  │  └─src
│  │          index.vue
│  │
│  ├─nav-header
│  │  │  index.ts
│  │  │
│  │  └─src
│  │          nav-header.vue
│  │          user-info.vue
│  │
│  ├─nav-menu
│  │  │  index.ts
│  │  │
│  │  └─src
│  │          nav-menu.vue
│  │
│  ├─page-content
│  │  │  index.ts
│  │  │
│  │  └─src
│  │          page-content.vue
│  │
│  ├─page-echart
│  │  │  index.ts
│  │  │  types.ts
│  │  │
│  │  ├─src
│  │  │      bar-echart.vue
│  │  │      line-echart.vue
│  │  │      map-echart.vue
│  │  │      pie-echart.vue
│  │  │      rose-echart.vue
│  │  │
│  │  └─utilts
│  │          convert-data.ts
│  │          coordinate-data.ts
│  │
│  ├─page-modal
│  │  │  index.ts
│  │  │
│  │  └─src
│  │          page-modal.vue
│  │
│  └─page-search
│      │  index.ts
│      │
│      └─src
│              page-search.vue
│
├─global
│      index.ts
│      register-properties.ts
│
├─hooks
│      usePageModal.ts
│      usePageSearch.ts
│      usePermission.ts
│
├─router
│  │  index.ts
│  │
│  └─main
│      ├─analysis
│      │  ├─dashboard
│      │  │      dashboard.ts
│      │  │
│      │  └─overview
│      │          overview.ts
│      │
│      ├─product
│      │  ├─category
│      │  │      category.ts
│      │  │
│      │  └─goods
│      │          goods.ts
│      │
│      ├─story
│      │  ├─chat
│      │  │      chat.ts
│      │  │
│      │  └─list
│      │          list.ts
│      │
│      └─system
│          ├─department
│          │      department.ts
│          │
│          ├─menu
│          │      menu.ts
│          │
│          ├─role
│          │      role.ts
│          │
│          └─user
│                  user.ts
│
├─service
│  │  axios_demo.ts
│  │  index.ts
│  │
│  ├─login
│  │      login.ts
│  │      types.ts
│  │
│  ├─main
│  │  ├─analysis
│  │  │      analysis.ts
│  │  │
│  │  └─system
│  │          system.ts
│  │          types.ts
│  │
│  └─request
│          config.ts
│          index.ts
│
├─store
│  │  index.ts
│  │  types.ts
│  │
│  ├─login
│  │      login.ts
│  │      types.ts
│  │
│  └─main
│      ├─analysis
│      │      analysis.ts
│      │      types.ts
│      │
│      └─system
│              system.ts
│              types.ts
│
├─utils
│      cache.ts
│      date-format.ts
│      map-menu.ts
│
└─views
    ├─login
    │  │  login.vue
    │  │
    │  ├─config
    │  │      login-account.ts
    │  │      login-phone.ts
    │  │
    │  └─cpns
    │          login-account.vue
    │          login-panel.vue
    │          login-phone.vue
    │
    ├─main
    │  │  main.vue
    │  │
    │  ├─analysis
    │  │  ├─dashboard
    │  │  │      dashboard.vue
    │  │  │
    │  │  └─overview
    │  │      │  overview.vue
    │  │      │
    │  │      └─p-config
    │  │              dependencies.ts
    │  │              dev-dependencies.ts
    │  │              index.ts
    │  │              project-dir.ts
    │  │              technology-stacks.ts
    │  │
    │  ├─product
    │  │  ├─category
    │  │  │      category.vue
    │  │  │
    │  │  └─goods
    │  │      │  goods.vue
    │  │      │
    │  │      └─config
    │  │              content.config.ts
    │  │              search.config.ts
    │  │
    │  ├─story
    │  │  ├─chat
    │  │  │      chat.vue
    │  │  │
    │  │  └─list
    │  │          list.vue
    │  │
    │  └─system
    │      ├─department
    │      │  │  department.vue
    │      │  │
    │      │  └─config
    │      │          content.config.ts
    │      │          pageModal.config.ts
    │      │          search.config.ts
    │      │
    │      ├─menu
    │      │  │  menu.vue
    │      │  │
    │      │  └─config
    │      │          content.config.ts
    │      │          search.config.ts
    │      │
    │      ├─role
    │      │  │  role.vue
    │      │  │
    │      │  └─config
    │      │          content.config.ts
    │      │          pageModal.config.ts
    │      │          search.config.ts
    │      │
    │      └─user
    │          │  user.vue
    │          │
    │          └─config
    │                  content.config.ts
    │                  pageModal.config.ts
    │                  search.config.ts
    │
    └─not-found
            not-found.vue
`
