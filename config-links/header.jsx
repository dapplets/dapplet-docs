import React from 'react'
import DiscordIcon from '../src/components/icons/DiscordIcon'
import GitHubIcon from '../src/components/icons/GitHubIcon'
import TelegramIcon from '../src/components/icons/TelegramIcon'

export const headerSocials = [
  { id: 0, component: <GitHubIcon />, href: 'https://github.com/dapplets', title: 'GitHub' },
  { id: 1, component: <DiscordIcon />, href: 'https://discord.gg/YcxbkcyjMV ', title: 'Discord' },
  { id: 2, component: <TelegramIcon />, href: 'https://t.me/dapplets', title: 'Telegram' },
]
