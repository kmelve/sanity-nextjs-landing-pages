export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5cd9a1a53c99b67fea4ccb08',
                  title: 'Sanity Studio',
                  name: 'sanity-nextjs-landing-pages-studio-vpwievta',
                  apiId: '6f24b879-f2a9-41d6-8e22-0edfe8ff7fcb'
                },
                {
                  buildHookId: '5cd9a1a5fdb465049fdf04ad',
                  title: 'Landing pages Website',
                  name: 'sanity-nextjs-landing-pages-web-psdhncy1',
                  apiId: 'c8d36936-9b68-4d9c-8f23-bbef43824d1a'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/kmelve/sanity-nextjs-landing-pages',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-nextjs-landing-pages-web-psdhncy1.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
