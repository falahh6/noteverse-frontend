export const sampleNotes: {
  id: string
  title: string
  content: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
}[] = [
  {
    id: '1',
    title: 'Project Kickoff Meeting',
    content:
      'Discussed project goals, deliverables, and timelines. Next meeting scheduled for next week.',
    userId: '101',
    createdAt: new Date('2024-07-15T09:30:00Z'),
    updatedAt: new Date('2024-07-15T09:30:00Z'),
  },
  {
    id: '2',
    title: 'Design Review',
    content:
      'Reviewed design mockups for the new app interface. Agreed on a few minor changes.',
    userId: '102',
    createdAt: new Date('2024-07-18T14:00:00Z'),
    updatedAt: new Date('2024-07-19T09:00:00Z'),
  },
  {
    id: '3',
    title: 'Client Feedback',
    content: null,
    userId: '103',
    createdAt: new Date('2024-07-20T16:30:00Z'),
    updatedAt: new Date('2024-07-20T16:30:00Z'),
  },
  {
    id: '4',
    title: 'Development Update',
    content:
      'Completed initial setup of the backend API. Next step is to integrate the frontend.',
    userId: '104',
    createdAt: new Date('2024-07-25T11:15:00Z'),
    updatedAt: new Date('2024-07-25T11:15:00Z'),
  },
  {
    id: '5',
    title: 'Bug Fixes',
    content:
      'Resolved several bugs related to user authentication and data retrieval.',
    userId: '105',
    createdAt: new Date('2024-07-27T13:45:00Z'),
    updatedAt: new Date('2024-07-28T10:20:00Z'),
  },
  {
    id: '6',
    title: 'Marketing Strategy',
    content:
      'Outlined a strategy for the upcoming product launch. Focusing on social media and email campaigns.',
    userId: '106',
    createdAt: new Date('2024-07-29T08:00:00Z'),
    updatedAt: new Date('2024-07-29T08:00:00Z'),
  },
  {
    id: '7',
    title: 'Team Lunch',
    content:
      'Organized a team lunch to celebrate the successful completion of phase one.',
    userId: '107',
    createdAt: new Date('2024-07-30T12:30:00Z'),
    updatedAt: new Date('2024-07-30T12:30:00Z'),
  },
  {
    id: '8',
    title: 'New Feature Request',
    content:
      'Client requested a new feature to be added in the next sprint. Details to be discussed.',
    userId: '108',
    createdAt: new Date('2024-08-01T10:00:00Z'),
    updatedAt: new Date('2024-08-01T10:00:00Z'),
  },
  {
    id: '9',
    title: 'Code Review',
    content:
      'Conducted a code review session to ensure coding standards are being met.',
    userId: '109',
    createdAt: new Date('2024-08-03T15:30:00Z'),
    updatedAt: new Date('2024-08-03T15:30:00Z'),
  },
  {
    id: '10',
    title: 'Sprint Planning',
    content:
      'Planned the tasks for the upcoming sprint. Focused on completing user authentication module.',
    userId: '110',
    createdAt: new Date('2024-08-05T09:45:00Z'),
    updatedAt: new Date('2024-08-05T09:45:00Z'),
  },
]

export const threads = [
  {
    id: 1,
    user: {
      name: 'Mohammed Falah',
      avatar: 'https://github.com/shadcn.png',
      fallback: 'MF',
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: 'yesterday',
    replies: [
      {
        id: 101,
        user: {
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
          fallback: 'JD',
        },
        content: 'Totally agree with you, Mohammed!',
        date: 'yesterday',
      },
      {
        id: 102,
        user: {
          name: 'Alex Turner',
          avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
          fallback: 'AT',
        },
        content: 'Interesting point!',
        date: 'yesterday',
      },
    ],
  },
  {
    id: 2,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
      fallback: 'SJ',
    },
    content: 'This is another comment! Great job on the post.',
    date: '2 days ago',
    replies: [
      {
        id: 201,
        user: {
          name: 'Emma Watson',
          avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
          fallback: 'EW',
        },
        content: 'I second that, the post was excellent!',
        date: '1 day ago',
      },
    ],
  },
  {
    id: 3,
    user: {
      name: 'Alex Turner',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
      fallback: 'AT',
    },
    content: 'Here’s some feedback for your project.',
    date: '3 days ago',
    replies: [],
  },
  {
    id: 4,
    user: {
      name: 'Emma Watson',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      fallback: 'EW',
    },
    content: 'I love the design you’ve implemented here!',
    date: '5 days ago',
    replies: [
      {
        id: 401,
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
          fallback: 'SJ',
        },
        content: 'It really does look great!',
        date: '4 days ago',
      },
    ],
  },
  {
    id: 5,
    user: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      fallback: 'JD',
    },
    content: 'Looking forward to more updates!',
    date: 'a week ago',
    replies: [],
  },
]

export const ssl = [
  {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'SSL (Secure Sockets Layer) configuration is crucial for ensuring secure communication between a web server and clients. Below is a concise guide to configuring SSL for a web server.',
      },
    ],
  },
  {
    type: 'heading',
    attrs: { level: 3 },
    content: [
      { type: 'text', text: '1. ' },
      {
        type: 'text',
        text: 'Choose and Install an SSL Certificate',
        marks: [{ type: 'bold' }],
      },
    ],
  },
  {
    type: 'bullet_list',
    content: [
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Select an SSL Certificate',
                marks: [{ type: 'bold' }],
              },
              {
                type: 'text',
                text: ": Choose a certificate that fits your needs, such as a Domain Validated (DV), Organization Validated (OV), or Extended Validation (EV) certificate. For development purposes, you can use a free SSL certificate from Let's Encrypt.",
              },
            ],
          },
        ],
      },
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Purchase or Generate',
                marks: [{ type: 'bold' }],
              },
              {
                type: 'text',
                text: ": Purchase an SSL certificate from a trusted Certificate Authority (CA) or generate one using Let's Encrypt.",
              },
            ],
          },
        ],
      },
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Obtain CSR (Certificate Signing Request)',
                marks: [{ type: 'bold' }],
              },
              {
                type: 'text',
                text: ": Generate a CSR on your server, providing details like domain name, organization, and locality. This can usually be done using OpenSSL or the server's control panel.",
              },
            ],
          },
        ],
      },
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Submit CSR and Obtain Certificate',
                marks: [{ type: 'bold' }],
              },
              {
                type: 'text',
                text: ': Submit the CSR to the CA and, once verified, download the certificate files.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'heading',
    attrs: { level: 3 },
    content: [
      { type: 'text', text: '2. ' },
      {
        type: 'text',
        text: 'Install SSL Certificate on the Server',
        marks: [{ type: 'bold' }],
      },
    ],
  },
  {
    type: 'bullet_list',
    content: [
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Copy Certificate Files',
                marks: [{ type: 'bold' }],
              },
              {
                type: 'text',
                text: ': Transfer the certificate files to your server, typically including the certificate (.crt), intermediate certificate (if any), and private key (.key).',
              },
            ],
          },
        ],
      },
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Configure the Web Server',
                marks: [{ type: 'bold' }],
              },
              { type: 'text', text: ':' },
            ],
          },
          {
            type: 'bullet_list',
            content: [
              {
                type: 'list_item',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Apache',
                        marks: [{ type: 'bold' }],
                      },
                      { type: 'text', text: ':' },
                    ],
                  },
                  {
                    type: 'bullet_list',
                    content: [
                      {
                        type: 'list_item',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              {
                                type: 'text',
                                text: 'Edit the SSL configuration file (usually found in ',
                              },
                              {
                                type: 'text',
                                text: '/etc/httpd/conf.d/ssl.conf',
                                marks: [{ type: 'code' }],
                              },
                              { type: 'text', text: ' or ' },
                              {
                                type: 'text',
                                text: '/etc/apache2/sites-available/default-ssl.conf',
                                marks: [{ type: 'code' }],
                              },
                              { type: 'text', text: ').' },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'list_item',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              {
                                type: 'text',
                                text: 'Add the paths to the certificate, private key, and intermediate certificates:',
                              },
                            ],
                          },
                          {
                            type: 'code_block',
                            attrs: { language: 'apache' },
                            content: [
                              {
                                type: 'text',
                                text: 'SSLEngine on\nSSLCertificateFile /path/to/certificate.crt\nSSLCertificateKeyFile /path/to/private.key\nSSLCertificateChainFile /path/to/intermediate.crt',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'list_item',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              {
                                type: 'text',
                                text: 'Save the file and restart Apache: ',
                              },
                              {
                                type: 'text',
                                text: 'sudo systemctl restart apache2',
                                marks: [{ type: 'code' }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'list_item',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Nginx',
                        marks: [{ type: 'bold' }],
                      },
                      { type: 'text', text: ':' },
                    ],
                  },
                  {
                    type: 'bullet_list',
                    content: [
                      {
                        type: 'list_item',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              {
                                type: 'text',
                                text: 'Edit the SSL configuration in the server block of your Nginx configuration file (usually in ',
                              },
                              {
                                type: 'text',
                                text: '/etc/nginx/sites-available/yourdomain',
                                marks: [{ type: 'code' }],
                              },
                              { type: 'text', text: ').' },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'list_item',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              {
                                type: 'text',
                                text: 'Add the paths to the certificate and key files:',
                              },
                            ],
                          },
                          {
                            type: 'code_block',
                            attrs: { language: 'nginx' },
                            content: [
                              {
                                type: 'text',
                                text: 'server {\n    listen 443 ssl;\n    ssl_certificate /path/to/certificate.crt;\n    ssl_certificate_key /path/to/private.key;\n}',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'list_item',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              {
                                type: 'text',
                                text: 'Save the file and restart Nginx: ',
                              },
                              {
                                type: 'text',
                                text: 'sudo systemctl restart nginx',
                                marks: [{ type: 'code' }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'heading',
    attrs: { level: 3 },
    content: [
      { type: 'text', text: '3. ' },
      {
        type: 'text',
        text: 'Configure SSL Security ',
        marks: [{ type: 'bold' }],
      },
      {
        type: 'text',
        text: 'https://google.com',
        marks: [
          {
            type: 'link',
            attrs: { href: 'https://google.com' },
          },
          { type: 'bold' },
        ],
      },
    ],
  },
  {
    type: 'bullet_list',
    content: [
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Force HTTPS', marks: [{ type: 'bold' }] },
              {
                type: 'text',
                text: ': Redirect HTTP traffic to HTTPS by adding a redirect rule in the server configuration. For example, in Nginx:',
              },
            ],
          },
          {
            type: 'code_block',
            attrs: { language: 'nginx' },
            content: [
              {
                type: 'text',
                text: 'server {\n    listen 80;\n    server_name yourdomain.com;\n    return 301 https://$host$request_uri;\n}',
              },
            ],
          },
        ],
      },
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Enable HTTP/2',
                marks: [{ type: 'bold' }],
              },
              {
                type: 'text',
                text: ': HTTP/2 provides performance improvements and is supported over SSL. In Nginx, add ',
              },
              { type: 'text', text: 'http2', marks: [{ type: 'code' }] },
              { type: 'text', text: ' to the listen directive: ' },
              {
                type: 'text',
                text: 'listen 443 ssl http2;',
                marks: [{ type: 'code' }],
              },
              { type: 'text', text: '.' },
            ],
          },
        ],
      },
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Disable Weak Protocols',
                marks: [{ type: 'bold' }],
              },
              {
                type: 'text',
                text: ': Ensure older protocols like SSLv3 and TLSv1.0 are disabled. In Apache, you can configure this with ',
              },
              { type: 'text', text: 'SSLProtocol', marks: [{ type: 'code' }] },
              { type: 'text', text: ' and ' },
              {
                type: 'text',
                text: 'SSLCipherSuite',
                marks: [{ type: 'code' }],
              },
              { type: 'text', text: ' directives.' },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'heading',
    attrs: { level: 3 },
    content: [
      { type: 'text', text: '4. ' },
      {
        type: 'text',
        text: 'Test SSL Configuration',
        marks: [{ type: 'bold' }],
      },
    ],
  },
  {
    type: 'bullet_list',
    content: [
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Check Configuration',
                marks: [{ type: 'bold' }],
              },
              {
                type: 'text',
                text: ": Use online tools like SSL Labs' SSL Test to check the configuration and ensure there are no vulnerabilities.",
              },
            ],
          },
        ],
      },
      {
        type: 'list_item',
        content: [
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Monitor SSL', marks: [{ type: 'bold' }] },
              {
                type: 'text',
                text: ": Regularly monitor your SSL certificate's expiration date and renewal process, especially if using Let's Encrypt, which issues certificates with short lifespans.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'heading',
    attrs: { level: 3 },
    content: [{ type: 'text', text: 'Conclusion' }],
  },
  {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'By following these steps, you can configure SSL on your web server, ensuring secure and encrypted communication between your site and its users. Regularly review and update your SSL settings to maintain optimal security.',
      },
    ],
  },
]
