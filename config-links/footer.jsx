import React from 'react'
import DiscordIcon from '../src/components/icons/DiscordIcon'
import FacebookIcon from '../src/components/icons/FacebookIcon'
import GitHubIcon from '../src/components/icons/GitHubIcon'
import MailIcon from '../src/components/icons/MailIcon'
import MediumIcon from '../src/components/icons/MediumIcon'
import TelegramIcon from '../src/components/icons/TelegramIcon'
import TwitterIcon from '../src/components/icons/TwitterIcon'

export const footerSocials = [
  {
    id: 0,
    component: <GitHubIcon />,
    href: 'https://github.com/dapplets',
    type: 'link',
    title: 'GitHub',
  },
  {
    id: 1,
    component: <DiscordIcon />,
    href: 'https://discord.gg/YcxbkcyjMV ',
    type: 'link',
    title: 'Discord',
  },
  {
    id: 2,
    component: <TelegramIcon />,
    href: 'https://t.me/dapplets ',
    type: 'link',
    title: 'Telegram',
  },
  {
    id: 3,
    component: <MediumIcon />,
    href: 'https://medium.com/@dapplets',
    type: 'link',
    title: 'Meduim',
  },
  { id: 4, component: <TwitterIcon />, href: '', type: 'link', title: 'Twitter' },
  { id: 5, component: <FacebookIcon />, href: '', type: 'link', title: 'Facebook' },
  { id: 6, component: <MailIcon />, href: 'business@dapplets.org', type: 'email', title: 'Email' },
]

export const footerLinks = []
