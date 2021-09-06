import React from 'react';

import GitHubIcon from '../src/components/icons/GitHubIcon';
import DiscordIcon from "../src/components/icons/DiscordIcon";
import TelegramIcon from "../src/components/icons/TelegramIcon";

export const headerSocials = [
  { id: 0, component: <GitHubIcon />, href: 'https://github.com/dapplets' },
  { id: 1, component: <DiscordIcon />, href: 'https://discord.gg/YcxbkcyjMV ' },
  { id: 2, component: <TelegramIcon />, href: 'https://t.me/dapplets ' },
];